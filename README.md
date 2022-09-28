# 1 - npm install
# 2 - Run: 
# npx gulp | npm run dev | npm run build | npm run zip

# (_!_)------------
# To solve the issue:

file:///home/runner/../gulp/tasks/reset.js:1
import del from "del";
       ^^^
SyntaxError: The requested module 'del' does not provide an export named 'default'

# should install DEL package using 
# npm install del@6
# ------------(_!_)

