# merge

## merge

```html
git merge release

将 release 分支合并到 main 分支【当前分支】
```



```html
git merge --abort

当代码未合并之前，取消merge
```



```html
当代码已经合并，想取消merge

git log

拿到想要回去的commit id
```



```html
git reset --hard c16f84126ec880d08cf69f9333afa2666083ae47

还原到指定id
```



### git merge ,merge 成功后没有merge记录，只有commit记录

> 在 `Git` 中，`**git merge**` 命令是用于将一个分支的更改合并到另一个分支的操作。当成功地执行了合并操作后，`Git` 会自动创建一个合并提交`（merge commit）`来记录这次合并的结果。
> 
> 如果在执行 `**git merge**` 后没有看到合并提交记录，可能是因为合并操作没有引入新的更改。这种情况下，`Git` 会执行所谓的 "快进合并"`（fast-forward merge）`，它会简单地将目标分支指向源分支的最新提交，而不会创建新的合并提交。
> 
> 快进合并通常发生在以下情况下：
> 
> -   当目标分支（通常是 `**master**​`分支）不包含任何新的提交，并且没有与源分支（比如一个特性分支）之间的冲突时。
> -   当源分支的所有提交都是基于目标分支的最新提交的。
> 
> 在这种情况下，`Git` 会直接将目标分支指向源分支的最新提交，不会创建新的合并提交。
> 
> 如果你想要确保每次合并都创建一个合并提交，你可以使用 `**--no-ff**` 选项进行合并，即 `**git merge --no-ff**`。这将强制 `Git` 创建一个新的合并提交，即使是快进合并的情况。
> 
> 需要注意的是，合并提交只有在合并操作引入了新的更改时才会创建，如果没有新的更改或是快进合并，就不会创建合并提交。

## cherry-pick

```html
git cherry-pick 5e12ecb4463ef1b2211f3d1dfa4fc749e3c8a125

合并指定提交记录【是一个新的提交】
```



> git cherry-pick 是一个用于选择性地应用单个提交的 Git 命令。它允许你将一个或多个提交从一个分支复制到另一个分支，而无需将整个分支合并。
> 
> 以下是 git cherry-pick 命令的一些常用选项：
> 
> -   git cherry-pick &lt;commit>：选择一个提交并将其应用到当前分支。&lt;commit> 是要应用的提交的引用，可以是提交的哈希值、分支名或标签名。
> -   git cherry-pick -n/--no-commit &lt;commit>：将提交应用到当前分支，但不自动生成新的提交。你可以在应用完所有提交后手动进行一次提交。
> -   git cherry-pick -e/--edit &lt;commit>：在应用提交之前打开编辑器，允许你编辑提交信息。
> -   git cherry-pick -x/--signoff &lt;commit>：在应用提交时自动附加提交者信息。
> -   git cherry-pick --abort：中止当前正在进行的 git cherry-pick 操作，并重置当前分支到操作之前的状态。
> -   git cherry-pick --continue：在解决冲突后继续进行 git cherry-pick 操作。
```html
# 多个提交记录
git cherry-pick hash1 hash2 hash3
```
```html
# 在解决冲突后继续进行 git cherry-pick 操作。
git cherry-pick --continue
```
```html
# 中止当前正在进行的 git cherry-pick 操作，并重置当前分支到操作之前的状态。
git cherry-pick --abort
```
```html
# 允许你创建一个空的提交，而不需要选择具体的提交内容。
git cherry-pick --allow-empty
```

## rebase

### 删除指定提交

> 现在有`tst``3``4`三个提交记录。想删除掉`3`



```typescript
 git rebase -i <目标提交的父提交>
```





> 按`i`键进入编辑模式，将`pick`改为`d`,然后按`ESC`键，输入`:wq`,回车，成功。







  

1.  确保您当前在包含要删除提交的分支上。可以使用 `git branch` 命令检查当前所在的分支。
2.  运行以下命令启动 `rebase` 操作：

```plain
git rebase -i <目标提交的父提交>
```

将 `&lt;目标提交的父提交>` 替换为要删除的提交的父提交的 SHA 标识或提交号码。

3.  Git 会打开一个交互式的 rebase 编辑器，显示要进行 rebase 的提交列表。在编辑器中，找到要删除的提交，并将其行前面的操作从 pick 或 edit 改为 drop。然后保存并关闭编辑器。例如，将 pick 操作修改为 drop：

```plain
pick abc123 Commit message
drop def456 Commit to delete
pick xyz789 Another commit
```

4.  Git 会开始重新应用提交，并自动跳过被标记为 drop 的提交。
5.  当 rebase 操作完成后，被删除的提交就会从分支历史中被移除。请注意，删除提交会改变分支的历史，因此在共享或公共分支上删除提交可能会导致其他开发人员的困惑。在执行此操作之前，请确保您了解其潜在的影响，并与团队成员进行沟通。希望这个解答对您有帮助！如果您还有其他问题，请随时提问。

## reset

> git reset是一个强大的Git命令，用于撤消提交、移动分支指针和重置工作目录到不同的状态。以下是git reset的一些常见用法：
> 
> 1.  恢复文件到上一个提交的状态：git reset HEAD &lt;file> 这将取消已经添加到暂存区的文件的更改，将其恢复到上一个提交的状态。
> 2.  取消最后一次提交：git reset HEAD~ 这将撤消最后一次提交，并将更改保留在工作目录中。
> 3.  撤消多个提交：git reset &lt;commit-hash> 这将把当前分支的指针移动到指定的提交，并将后续的提交标记为未提交的更改。
> 4.  强制移动分支指针：git reset --hard &lt;commit-hash> 这将强制将当前分支的指针移动到指定的提交，并将工作目录和索引文件重置为该提交。
> 
> 请注意，git reset 是一种强大的命令，慎用它可以避免丢失数据。在使用 git reset 之前，请确保您理解其影响，并确保已备份或提交了重要的更改。
```plain
git reset 93a06db2bfcfdd8b3b07d1543d547ad7d2e65885
```

放弃修改

```plain
git commit -m '回退至XXX'
```
```plain
git push origin dev --force
```
```html
1、切换到想要删除记录的分支，使用 git log 看一下提交记录
git log

2、git reset --hard 2d0e14de3ff3ae8a9db17f2b0b4c2941d48 (提交记录的 commit id)

3、最后一步 git push --force origin HEAD
```

## tag





```git
git add .

git commit -m "XXX"

git tag tagname

git push origin main tagname

git push origin main --tags
```
> `git push origin main tagname` 和 `git push origin main --tags` 两个命令的区别在于它们推送的内容和方式不同。
> 
> git push origin main tagname 命令将指定的标签（tagname）推送到远程仓库的主分支（main branch）。它只推送指定的标签，并不会推送其他分支或标签。
> 
> git push origin main --tags 命令将所有本地标签推送到远程仓库的主分支。它推送所有本地标签，无论它们是否与当前分支相关联。
> 
> 总结来说，第一个命令只推送指定的标签，而第二个命令推送所有本地标签。
> 要使用 Git 的标签（tag）进行回滚操作，您可以按照以下步骤进行操作：
> 
> 1.  首先，确保您当前位于要回滚的分支上。如果您想要回滚的是主分支（通常是 master 或 main 分支），请确保您已经切换到该分支。
> 2.  运行 git tag 命令列出所有的标签。找到您想要回滚到的标签的名称。
> 3.  运行 git checkout &lt;tag-name>，将您的代码库切换到特定的标签。例如，如果您要回滚到标签名为 v1.0 的版本，可以运行 git checkout v1.0。
> 4.  检查您的代码库状态。确保没有未提交的更改。如果有未提交的更改，请先提交或暂存更改。
> 5.  运行 git push origin &lt;branch-name> --tags，将所有标签推送到远程仓库。确保将 &lt;branch-name>替换为您要回滚的分支的名称。
> 6.  在远程仓库中，使用相应的 Git 命令将分支回滚到指定的标签。具体的命令取决于您使用的 Git 客户端和配置。例如，您可以使用 git push origin &lt;branch-name> &lt;tag-name> 将分支回滚到指定的标签。
> 
> 请注意，这种方法将使远程仓库中的分支回滚到指定的标签。如果您在本地进行了更改并尚未提交，这些更改可能会丢失。因此，在执行此操作之前，请确保您已经提交或暂存了所有未提交的更改。
> 
> 另外，如果您需要更复杂的回滚操作，例如删除特定提交或进行其他历史修改，Git 可能提供更多的工具和技术来满足您的需求。请参考 Git 的官方文档或其他相关资源以获取更详细的信息。
