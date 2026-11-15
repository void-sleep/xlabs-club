# AGENTS.md

我的技术博客。

## 仓库约定

- 正文：`src/content/docs/blog/`（站点内容主体）。frontmatter 必填 `title`、`description`、`date`、`authors`、`categories`。
- 静态源文件：`public/`（favicon 等原样拷贝到站点根）。Logo 等需处理的资源：`src/assets/`。
- 站内链接：普通 Markdown 路径，如 `[标题](/blog/xxx/)`。
- 页面搬家默认不加 redirects，旧地址 404。
- 只改任务所需文件。不顺手改无关章节。
- 中间过程性内容不入库如：讨论、迁移校验脚本。

## 标签规范

- 每篇最多 3 个：产品名（仅在正文介绍该产品时挂）+ 问题域。
- 产品名用官方拼写；问题域优先复用已有词，确有必要再新增。
- 不用报错串、配置项、版本号做标签，交给 title / description。

## 写作风格

- 读取并遵循项目 skill `tech-docs-blog-writing`（`npx skills add https://github.com/void-sleep/agent-skills --skill tech-docs-blog-writing`）

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
- 排除规则写进仓库 `.gitignore`
- 提交前 `git status`，确认无多余文件

## 红线

- 不入库任何敏感信息：实密（密码、token、私钥、`.env`、cookie、证书）、本公司内网与未公开接入点、未公开产品规划。
