console.log("Inicio de la aplicacion");

console.log(process.argv);

const args = process.argv.slice(2);

async function getProducts(url) {
    try{
        const response = await fetch(`https://fakestoreapi.com/${url}`)
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }
}

async function deleteProduct(product){
    try{
        const response = await fetch(`https://fakestoreapi.com/${product}`,{
            method: "DELETE"
        })
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }
}

async function createProduct(product){
    try{
        const response = await fetch("https://fakestoreapi.com/products",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        })
        if(response.ok){
            const data = await response.json();
            console.log(data)
            console.log("product id: ", data.id)
        }
    }catch(error){
        console.log(error)
    }
}

switch(args[0]){
    case "GET":
        console.log(args[0]);
        if(args[1] && args[1].startsWith("products")){
            const products = await getProducts(args[1])
            console.log(products)
        }else{
            console.log("incomplete or incorrect command");
        }
        break;
    case "POST":
        console.log(args[0]);
        if(args[1] && args[2] && args[3] && args[4] && args[1] == "products"){
            await createProduct({title: args[2], price: args[3], category: args[4]})
            console.log("Product created")
        }else{
            console.log("incomplete or incorrect command")
        }
        break;
    case "DELETE":
        console.log(args[0]);
        if(args[1].startsWith("products/") && args[1].length > 9){
            const response = await deleteProduct(args[1]);
            console.log("Product deleted ", response)
        }else{
            console.log("incomplete or incorrect command")
        }
        break;
    default:
        console.log("incomplete or incorrect command")
}