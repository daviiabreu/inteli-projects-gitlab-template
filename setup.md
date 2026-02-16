# GitLab Project Setup Guide

Follow these steps to configure your GitLab repository with best practices for branching and merge requests.

---

## Step 1: Create the `develop` Branch
First, create the `develop` branch locally and push it to GitLab to establish your development workflow.

```bash
# Create and switch to the develop branch
git checkout -b develop

# Push the branch and set upstream
git push -u origin develop
```

---

## Step 2: Configure Merge Request Settings
Navigate to your project in GitLab, then go to:
**Settings** > **Merge requests**

### 1. Merge Method
Select **Fast-forward merge**.
- **Result:** No merge commits are created. History remains linear.
- **Note:** If a conflict exists, the user must rebase before merging.

### 2. Merge Options
Activate the following checkboxes:
- [x] **Show link to create or view a merge request when pushing from the command line**
- [x] **Enable "Delete source branch" option by default**

### 3. Squash Commits
Under **Squash commits when merging**, select:
- **Require**: This ensures all commits in a Merge Request are combined into a single clean commit on the target branch.

---

## Step 3: Enable Merge Checks
In the same **Settings** > **Merge requests** page, scroll down to **Merge checks**:

- [x] **Pipelines must succeed**: Prevents merging if the latest pipeline failed or is still running.
- [ ] **Skipped pipelines are considered successful**: **Leave this unchecked** to ensure no code bypasses the CI checks.

---

## Step 4: Branch Configuration & Protection

### 1. Set the Default Branch
Navigate to:
**Settings** > **Repository** > **Default branch**
- Ensure the default branch is set to `main`.

### 2. Protect Branches
Navigate to:
**Settings** > **Repository** > **Protected branches**

#### Protect `main`
- **Allowed to merge:** Developers and Maintainers
- **Allowed to push:** No one (forces all changes through Merge Requests)

#### Protect `develop`
- **Allowed to merge:** Developers and Maintainers
- **Allowed to push:** No one (forces all changes through Merge Requests)

---

## Step 5: Configure Documentation Base Path
To ensure the documentation site works correctly when deployed to GitLab Pages, you must update the `basePath` and `assetPrefix` in `docs/next.config.mjs`.

1. Open `docs/next.config.mjs`.
2. Replace `/NOME_DO_REPOSITORIO` with your project's path (e.g., `/2026-1a/t12/g05`).
3. Save the file and commit the changes.
