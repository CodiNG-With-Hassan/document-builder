#!/bin/sh
# Project-specific pre-commit guards. Invoked first by the shared hook that
# @coding-with-hassan/devkit installs (`hassan-devkit hooks:install`); exit non-zero to
# block the commit. Keep project-wide standards in the package — only guards that need
# knowledge of THIS repo belong here.
exit 0
