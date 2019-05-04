import React, {Fragment} from 'react'; 

function Products({products}){
    return (
        <Fragment>
            {products.map(item => {
                return <div key={item.id}>{item.productName}</div>
            })}
        </Fragment>
    )
}

export default Products; 