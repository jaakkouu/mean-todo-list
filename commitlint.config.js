module.exports = {
    extends: ['@commitlint/config-conventional'],
    "rules": {
        "scope-enum": [2, "always", [
            "ui",
            "api",
            "db",
            "ci",
            "docs",
            "dev"
        ]],
    }
}
