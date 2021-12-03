import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { ADD_CART_COUNT, ADD_USER_DATA } from '../constant/CONSTANT';
import LoadingPage from '../components/Assets/LoadingPage';
import Header from './Header';
import styles from '../styles/ItemPage/ItemPage.module.css';


class ItemPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: null,
      itemData: null,
      loading: true,
      currentCategoryId: '',
      currentCategorySlug: '',
      currentCategoryName: '',
      currentActiveImage: '',
      currentItemQuantity: 1
    }
  }

  // Fetch Method
  getBarangIdBased = () => {
    fetch(
      `https://adolloka.herokuapp.com/api/barang/${this.props.match.params.id}/show`
    )
    .then(async res => {
      if (res.status === 200) {
        const body = await res.json();
        
        this.setState({ 
          itemData: body.data,
          currentCategoryId: body.data.kategori_id,
          currentActiveImage: ((body.data.foto).length === 0 ? "/assets/product-pic.jpg" : body.data.foto[0].foto)
        })
        this.getItemCategories()
      } else {
        console.log(res.status)
      }
      console.log(this.state.itemData.kategori_id)
      
      this.setState({ loading: false })
    })
    .catch(err => {
      console.log(err)
      this.setState({ loading: false })
    })
  }

  getItemCategories = () => {
    // const { itemData } = this.state

    fetch(
      'https://adolloka.herokuapp.com/api/barang/kategori'
    )
    .then(async res => {
      if (res.status === 200) {
        const body = await res.json();

        console.log(this.state.itemData)
        this.setState({
          // itemCategories: body.kat,
          // loading: false,
          currentCategorySlug: body.kat[this.state.currentCategoryId-1].slug,
          currentCategoryName: body.kat[this.state.currentCategoryId-1].kategori
        })
      } else {
        console.log('Failed getting categories data')
        // this.setState({ loading: false })
      }
    })
    .catch(err => {
      console.log(err)
      // this.setState({ loading: false })
    })
  }

  getUserData = () => {
    fetch(
      'https://adolloka.herokuapp.com/api/user', 
      {
        headers: {
          'Authorization': `Bearer ${this.props.token}`
        }
      }
    )
    .then(async res => {
      if (res.status === 200) {
        const body = await res.json();
        this.setState({userData: body})
        this.props.saveData(this.state.userData)
        console.log(this.props)
        this.getBarangIdBased()
        // this.categoryParser(this.state.userData.kategori_id, this.state.itemCategories)
      }

      // this.setState({ loading: false })
    })
    .catch(err => {
      console.log(err)
      // this.setState({ loading: false })
    })
  }

  createCart = (product_id, jumlah_barang) => {
    const { token } = this.props;
    var formData = new FormData();
    formData.append('id_barang', product_id);
    formData.append('jumlah', jumlah_barang)

    fetch(
      'https://adolloka.herokuapp.com/api/cart/add', 
      {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      }
    )
  }

  //Custom Method

  componentDidMount() {
    if (this.props.isLogin) {
      this.getUserData()
    } else if (this.props.isLogin === false) {
      this.getBarangIdBased();
      this.getItemCategories();
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingPage />
    } else if (this.state.loading === false) {
      return (
        <>
          {console.log(this.state)}
          <Header mainProps={this.props.history} />
          <div className={styles.productDisplayContainer}>
            <div className={styles.productTitleBar}>
              <ol className={styles.productNavigationBar}>
                <li className={styles.productNavList}>
                  <Link to="/">Home</Link>
                </li>
                <li className={styles.productNavList}>
                  <Link to={{
                    pathname: `/category/${this.state.currentCategorySlug}`, 
                    state: this.state.currentCategoryId
                  }}>{this.state.currentCategoryName}</Link>
                </li>
                <li className={styles.productNavList}>
                  <h2>{this.state.itemData.nama}</h2>
                </li>
              </ol>
            </div>
            <div className={styles.productDisplayWrapper}>
              <div className={styles.productMedia}>
                <div className={styles.productMediaTopWrapper}>
                  <div className={styles.productMediaDisplay}>
                    <div className={`${styles.productMediaThirdLayer}  ${styles.active}`}>
                      <div className={styles.productMediaImageWrapper} style={{ height: 100+'%'}}>
                        <img className={styles.productMediaImage} src={this.state.currentActiveImage} style={{ objectFit: 'cover' }} alt="Active Product"/>
                      </div>
                    </div>
                  </div>
                  <div className={styles.productMediaSmallDisplay}>
                    <div className={styles.productMediaSmallTopWrapper}>
                      <div className={styles.productMediaSmall}>
                        {this.state.itemData.foto.map((el, key) => (
                          <div className={`${styles.productMediaSmallBeforeImage} ${el.foto === this.state.currentActiveImage ? styles.active : null}`} onMouseEnter={() => this.setState({ currentActiveImage: el.foto })}>
                            <div className={styles.productMediaSmallImageWrapper}>
                              <img className={styles.productMediaSmallImage} src={el.foto} alt="small product" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.productVariant}>
                <div className={styles.productVariantOptionsWrapper}>
                  <div className={styles.productVarianOptionsForm}>
                    <h6 className={styles.wrapperTitle}>Atur Jumlah</h6>
                    <div className={styles.productAmountHandler}>
                      <div className={styles.productQuantityEditor}>
                        <button className={styles.itemQuantityButton} onClick={() => this.setState({ currentItemQuantity: this.state.currentItemQuantity - 1 })} {...this.state.currentItemQuantity === 1 ? { disabled: 'disabled' } : null}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#3A86FF" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                          </svg>
                        </button>
                        <input value={this.state.currentItemQuantity} max={this.state.itemData.jumlah} min={1} className={styles.productQuantityEditorInput} type="text" readOnly/>
                        <button className={styles.itemQuantityButton} onClick={() => this.setState({ currentItemQuantity: this.state.currentItemQuantity + 1 })} {...this.state.currentItemQuantity === this.state.itemData.jumlah ? { disabled: 'disabled' } : null}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#3A86FF" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                          </svg>
                        </button>
                      </div>
                      <p>
                        Stok
                        &nbsp;<b>{this.state.itemData.jumlah}</b>
                      </p>
                    </div>
                    <div className={styles.productQuantityAlert}>
                      <p>Max. pembelian {this.state.itemData.jumlah} pcs</p>
                    </div>
                    <div className={styles.productPriceTotalWrapper}>
                      <p>Subtotal</p>
                      <p className={styles.productPriceTotal}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.state.itemData.harga * this.state.currentItemQuantity)}</p>
                    </div>
                    <div className={styles.productProcessButton}>
                      <div className={styles.theButton}>
                        <button className={styles.addToCartButton} onClick={() => {
                          this.props.addCart();
                          this.createCart(this.state.itemData.id, this.state.currentItemQuantity);
                        }}>
                          <span>+ Keranjang</span>
                        </button>
                        <button className={styles.directBuyButton}>
                          <span>Beli Langsung</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.productContent}>
                <div className={styles.productContentTopWrapper}>
                  <h1 className={styles.productContentTitle}>{this.state.itemData.nama}</h1>
                  {/* <div></div> */}
                  <div className={styles.productContentPrice}>
                    <div className={styles.price}>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR' }).format(this.state.itemData.harga)}</div>
                  </div>
                </div>
              </div>
              <div className={styles.productDetails}>
                <div className={styles.line1}></div>
                <div>
                  <div className={styles.productDetailsSection}>
                    <div className={styles.productDetailsSectionHolder}>
                      <div className={`${styles.productDetailsSectionTitle} ${styles.selectedSection}`}>Detail</div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.productDetailsContent}>
                      <span className={styles.productDetailsTopLayerWrapper}>
                        <span className={styles.productDetailsMainWrapper}>
                          <div className={styles.productDetailsText}>{this.state.itemData.deskripsi}</div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    currentUserData: state.currentUserData, 
    token: state.token,
    cartCounter: state.cartCounter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveData: (userData) => {
      dispatch({
        type: ADD_USER_DATA, 
        currentUserData: userData
      })
    }, 
    addCart: () => {
      dispatch({
        type: ADD_CART_COUNT
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
// export default ItemPage;