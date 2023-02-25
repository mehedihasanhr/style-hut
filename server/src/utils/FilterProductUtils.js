
/*
* This file contains the functions that 
* are used to filter the products
*/




export const filterProductData = (query) => {
    let filter = {
        
    };
    
    if(query.category){
        filter["categories.main"] = query.category;
    }

    if(query.subcategory){
        filter["categories.sub"] = {
            $in: [query.subcategory]
        }
    }

    console.log(filter);

    return filter;
}