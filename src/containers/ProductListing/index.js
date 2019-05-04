/**
 *
 * ProductListing
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'; 
import queryString from 'query-string'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// components
import Products from './Products'; 

// custom styles
import styles from './styles';

// utils 
import {colors} from '../../utils/colors'; 
import {adjectives} from '../../utils/adjectives'; 
import {materials} from '../../utils/materials'; 

// action imports
import {searchProducts} from './actions'; 

import {
  makeSelectLocation, 
  makeSelectLoading, 
  makeSelectProducts, 
  makeSelectError
} from './selectors';

import {
  Layout, Menu, Input, Select, Icon, Pagination
} from 'antd';

const { Header, Content, Sider, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ProductListing extends Component{

  constructor(props){
    super(props);
    this.state = {
      search : '', color : '', adjective : '', material : '', page : 1
    }
    this.handleFilter = this.handleFilter.bind(this);  
  }

  componentDidMount(){
    let parsed = queryString.parse(this.props.location.search);   
    // checking for empty object - ie - when no filters are applied
    if(!_.isEmpty(parsed)){ 
      // making the request here for fetching the required products according to the filter
      this.makeRequest(parsed);  
      // updating the value according to the value stored in the url 
      for (const key in parsed) {
        this.setState({[key] : parsed[key]}); 
      }
    }
  }

  handleFilter(val, key){
    // make the request
    let obj = {...this.state, [key] : val}; 
    this.makeRequest(obj);
    // updating the state accordingly 
    this.setState({[key] : val});
  }

  makeRequest(searchObj){ 
    this.props.dispatch(searchProducts(this.props.location, searchObj));  
  }

  renderProducts(){
    const { loading, products, error } = this.props; 
    if(loading) return antIcon; 
    if(error) return <div>There was an error!</div>
    if(!products.length) return <div>No Products were found!</div>
    else return <Products products={products}/>
  }

  render(){
    let {search, color, adjective, material, page} = this.state; 
    return (
      <Fragment>
        <Layout>
        <Header className="header">
          <div style={styles.Header}>Product Listing</div>
          <Search
            placeholder="Input Search Text"
            value={search ? search : null}
            onSearch={val => this.handleFilter(val, 'search')}
            onChange={(e) => this.setState({search : e.target.value})}
            onPressEnter={e => this.handleSearch(e.target.value)}
            enterButton
            style={styles.Search}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', textAlign : 'center' }}
              >
                <Select 
                  onChange={val => this.handleFilter(val, 'color')} 
                  value={color ? color : 'None'}
                  placeholder="Colors" 
                  style={styles.Select}
                >
                {colors.map(item => <Option key={item} value={item}>{item}</Option>)}
                </Select>
                <Select 
                  onChange={val => this.handleFilter(val, 'adjective')} 
                  value={adjective ? adjective : 'None'}
                  placeholder="Adjective" 
                  style={styles.Select}
                >
                {adjectives.map(item => <Option key={item} value={item}>{item}</Option>)}
                </Select>
                <Select 
                  onChange={val => this.handleFilter(val, 'material')} 
                  value={material ? material : 'None'}
                  placeholder="Materials" 
                  style={styles.Select}
                >
                {materials.map(item => <Option key={item} value={item}>{item}</Option>)}
                </Select>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.renderProducts()}
              <Pagination 
              current={page ? Number(page) : 1} 
              pageSize={10} 
              onChange={page => this.handleFilter(page, 'page')}
              total={this.props.products.length} 
            />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
        </Layout>  
      </Fragment>
    )
  }
}

ProductListing.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(), 
  products: makeSelectProducts(), 
  error: makeSelectError(), 
  location: makeSelectLocation()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(ProductListing);
