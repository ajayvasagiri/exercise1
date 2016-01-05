
let fs = require('pn/fs')

let path = require('path')

let _ = require('lodash')


let {dir} = require('yargs')
    .default('dir', __dirname)
    .argv

let files = []
// The function name "ls" has no special meaning
async function ls(rootPath){

    
    // Your code here


     try {
     	//let fileNames = await fs.readdir(__dirname)

     	if(fs.statSync(rootPath).isFile())
 		{
 			//console.log(rootPath)
 			return [rootPath]
 		} 
     	let fileNames = await fs.readdir(rootPath)
     	let lspromises = []
     	 for (let fileName of fileNames) {
     	 	let filePath = path.join(rootPath, fileName)
		 	 	 	let promise = ls(filePath)
		    	 	lspromises.push(promise)
    	}

    	 return   _.flatten(await Promise.all(lspromises))

        // ...
    } catch (e) {
        console.log(e.stack)
    }
}

	console.log('Executing ls function...')


// Call ls
ls(dir).then(filePaths => console.log(filePaths))

//step 3 await lspromise


