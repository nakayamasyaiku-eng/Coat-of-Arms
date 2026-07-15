# Coat of Arms

Coat of Arms 是一个中英双语的欧洲城市纹章铜板拓印品牌站与电商前台。项目使用 Next.js 16 App Router、TypeScript、Tailwind CSS 4、`next-intl`、Zustand、React Hook Form + Zod，并预留 Stripe、Supabase 与 Resend 的生产适配器。

## 本地启动

```bash
npm install
copy .env.example .env.local
npm run dev
```

访问：

- 英文首页：<http://localhost:3000/en>
- 中文首页：<http://localhost:3000/zh>
- 完整作品：`/{locale}/collection`
- 结算演示：作品详情 → Add to Cart / Buy Now → Contact → Review → Mock payment → Success

未配置外部密钥时，结算页会进入明确标记的 mock 支付回退，不会收集银行卡信息，也不会产生真实扣款。

## 常用命令

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

## 架构

- `src/app/[locale]`：中英文页面和本地化 SEO 路由。
- `messages/*.json`：所有通用界面文案。
- `src/lib/products.ts`：9 个 SKU 的服务端可信 seed 与双语城市故事；组件不保存价格常量。
- `src/store/cart.ts`：Zustand 持久化购物车、结算商品、联系资料和订单引用。
- `src/app/api/orders/contact`：强制联系资料校验、库存/slug 校验、draft order 创建。
- `src/app/api/checkout/session`：重新校验联系资料、商品、库存和服务端价格后创建 Stripe Checkout Session；无密钥时返回开发回退。
- `src/app/api/stripe/webhook`：Stripe 签名验证、`checkout.session.completed` 处理和 event id 幂等。
- `src/lib/server/orders.ts`：Supabase adapter；无凭证时使用进程内开发存储。
- `supabase/migrations` / `supabase/seed.sql`：生产数据结构和 9 个产品 seed。

订单状态建议保持为：

```text
draft → contact_submitted → payment_pending → paid → contacted → preparing → shipped → completed
```

## 环境变量

复制 `.env.example` 为 `.env.local`。真实密钥不得提交到仓库。

| 变量 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | canonical、Stripe 返回地址和图片绝对地址 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 公开读取产品目录（可选） |
| `SUPABASE_SERVICE_ROLE_KEY` | 服务端写入联系人、订单和支付事件 |
| `STRIPE_SECRET_KEY` | 创建 Checkout Session |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | 前端标识真实支付模式 |
| `STRIPE_WEBHOOK_SECRET` | 验证 Stripe webhook 签名 |
| `RESEND_API_KEY` | 联系表单／订单通知 |
| `RESEND_FROM_EMAIL` | 已在 Resend 验证的发件地址 |
| `ORDER_NOTIFICATION_EMAIL` | 工作室接收地址 |

## Stripe 设置

1. 配置 `STRIPE_SECRET_KEY`、`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` 和站点 URL。
2. 在 Stripe Dashboard 创建 webhook，指向 `/api/stripe/webhook`。
3. 订阅 `checkout.session.completed`，把签名密钥写入 `STRIPE_WEBHOOK_SECRET`。
4. 本地调试可用 Stripe CLI：

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

支付会话只接受产品 slug 与已校验联系资料。金额、币种、库存与商品可售状态均由服务端 `products.ts` 重新取得；浏览器提交的金额不会作为支付依据。支付成功由 webhook 确认，而不是依赖成功页跳转。

## Supabase 设置

1. 在 Supabase SQL Editor 执行 `supabase/migrations/001_initial.sql`。
2. 执行 `supabase/seed.sql`。
3. 配置 Supabase URL 与 service role key。

联系人、订单、订单行和支付事件默认仅通过 service role 写入。公开策略只允许读取产品与产品本地化表。

## 素材与设计

9 张真实原图位于 `public/images/products/`。素材文件名已根据原作底部手写城市名核对，而不是按原始数字文件名直接猜测。Kutná Hora 为横向图片，卡片和详情页保留其 4:3 比例。

视觉令牌集中在 `src/app/globals.css`：羊皮纸、炭黑、暗红蜡封、氧化铜、黄铜、墨绿和深木框。Cormorant Garamond 与 Noto Serif SC 使用本地 Fontsource 包，不依赖页面运行时下载。

## Assumptions / 待确认

上线前必须由品牌方确认并更新：

- `src/lib/products.ts` 中的演示价格（已集中标注 `TODO: replace with confirmed prices`）；
- 每件作品的准确尺寸、最终年份、作者完整署名、装裱选项、库存和实际 edition number；
- 工作室正式名称、简介、地址、Email、电话、Instagram 与隐私／条款全文；
- 配送国家、运费、税费、关税、时效、保险和退换条件；
- 证书样式及其字段；
- Stripe、Supabase、Resend 生产密钥和已验证发件域名；
- 产品图片的最终色彩校正、裁切以及是否需要细节摄影；
- `NEXT_PUBLIC_SITE_URL` 对应的生产域名。

当前作品数据中的城市历史文字为品牌编辑文案，不替代学术或法律意义上的来源核验。艺术家具体履历未作虚构。

## 部署

可直接部署到支持 Next.js 16 Node.js runtime 的平台。部署前运行四项验证命令，配置生产环境变量，执行 Supabase migration/seed，并在 Stripe 中更新 webhook URL。Node.js 建议使用当前 LTS 版本。
