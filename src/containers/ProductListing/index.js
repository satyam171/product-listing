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
  Layout, Menu, Input, Select
} from 'antd';

const { Header, Content, Sider, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;

class ProductListing extends Component{

  constructor(props){
    super(props);
    this.state = {
      search : '', color : '', adjective : '', material : '', page : 0
    }
    this.handleSearch = this.handleSearch.bind(this); 
    this.handleSelect = this.handleSelect.bind(this); 
  }

  componentDidMount(){
    let parsed = queryString.parse(this.props.location.search);   
    // checking for empty object - ie - when no filters are applied
    if(!_.isEmpty(parsed)){ 
      let {search, color, adjective, material, page} = parsed; 
      // updating the value according to the value stored in the url 
      this.setState({
        search, color, adjective, material, page
      })
    }
  }

  handleSearch(search){
    // make the request
    let obj = {...this.state, search}; 
    this.makeRequest(obj); 
    // update the state here for the search
    this.setState({search}); 
  }

  handleSelect(val, key){
    // make the request
    let obj = {...this.state, [key] : val}; 
    this.makeRequest(obj);
    // updating the state accordingly 
    this.setState({[key] : val});
  }

  makeRequest(searchObj){
    this.props.dispatch(searchProducts(searchObj));  
  }

  render(){
    return (
      <Fragment>
        <Layout>
        <Header className="header">
          <div style={styles.Header}>Product Listing</div>
          <Search
            placeholder="input search text"
            onSearch={val => this.handleSearch(val)}
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
                <Select onChange={val => this.handleSelect(val, 'color')} placeholder="Colors" style={styles.Select}>
                {colors.map(item => <Option key={item} value={item}>{item}</Option>)}
                </Select>
                <Select onChange={val => this.handleSelect(val, 'adjective')} placeholder="Adjective" style={styles.Select}>
                {adjectives.map(item => <Option key={item} value={item}>{item}</Option>)}
                </Select>
                <Select onChange={val => this.handleSelect(val, 'material')} placeholder="Materials" style={styles.Select}>
                {materials.map(item => <Option key={item} value={item}>{item}</Option>)}
                </Select>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              Content
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
