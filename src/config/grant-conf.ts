export default {
  "defaults": {
    "origin": "http://localhost:3000",
    "transport": "session",
    "state": true
  },
  "github": {
    "key": "8a7013cd85854a5e7f6f",
    "secret": "b9c7bacefaf8ba74d8a9423f9ae9bbc5e7f56825",
    "scope": ["public_repo"],
    "redirect_uri": "http://127.0.0.1:3000/oauth/redirect",
    "overrides": {
      "all": {
        "scope": ["repo", "gist", "user"],
        "callback": "/we"
      }
    }
  }
}