import React, {Fragment} from 'react'; 
import { Row, Col } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

function Products({products}){
    return (
        <Fragment>
            <Row>
            {products.map(item => {
                // return <div key={item.id}>{item.productName}</div>
                return (
                    <Col key={item.id} span={8}>
                        <Card
                            hoverable
                            style={{ width: '100%' }}
                            cover={<img alt="example" src={`${item.image}`} />}
                        >
                            <Meta
                            title={`${item.productName}`}
                            description={`
                                Color - ${item.color}
                                Adjective - ${item.productAdjective}
                                Material - ${item.productMaterial}
                            `}
                            />
                        </Card>
                    </Col>
                )
            })}
            </Row>
        </Fragment>
    )
}

export default Products; 