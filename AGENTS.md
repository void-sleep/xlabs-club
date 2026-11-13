# AGENTS.md

中文 IDaaS / IAM 技术书。Astro + Starlight，随 `main` 部署。

## 仓库约定

- 正文：`src/content/docs/`。frontmatter 保留 `title`、`description`、`sidebar.order`。侧栏由 `astro.config.mjs` 的 `sidebar` 按目录生成。
- 静态源文件：`public/`（favicon 等原样拷贝到站点根）。Logo 等需处理的资源：`src/assets/`。构建产物：`dist/`，不入库。
- 站内链接：普通 Markdown 路径，如 `[标题](/docs/fundamentals/xxx/)`。
- 页面搬家默认不加 redirects，旧地址 404。除非明确要求跳转。
- 命令：`pnpm install`、`pnpm run dev`、`pnpm run build`。
- 只改任务所需文件。不顺手改无关章节。
- 中间迁移校验脚本不入库。

## 写作风格

- 科技风简洁不啰嗦，无中间过程性表示，无关废话一律禁用

## Git 提交规范

Conventional Commits：`<type>(<scope>): <description>`。`type`：`feat` / `fix` / `docs` / `chore` / `ci` / `build`。`scope`：小写 kebab-case。按模块分批，互不相关的改动分开提交。未明确指定时不提交未跟踪文件和二进制。

### Worktree

linked worktree 只放本仓 `.worktrees/<slug>/`。`<slug>` 用分支语义（如 `astro-starlight`），不用项目名。禁止仓库外、并列目录或其他路径。

### 提交信息

- 英文（header 与 body；Issue 放页脚 `Refs:` / `Closes:`）
- 写主要变更和原因，不写逐文件流水账
- 禁止 agent 署名后缀（`Co-Authored-By`、`Generated with ...`）

### main 分支清洁

- 构建产物、日志、缓存、临时文件、依赖目录等中间产物一律不入库
- 排除规则写进仓库 `.gitignore`，不靠全局 gitignore（多机部署，全局不可移植）
- 提交前 `git status`，确认无多余文件

## 红线

- 不入库：实密（密码、token、私钥、`.env`、cookie、证书）、本公司内网与未公开接入点、未公开产品规划。
- 工作区或 diff 里出现即停，改成示例后再提交。
