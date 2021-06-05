import React from 'react';
import { Link } from 'react-router-dom';
// import LoadingPage from '../../components/Assets';
import styles from '../../styles/Home/Home.module.css';


const toTitleCase = (text) => {
  var newText = text.split(' ')
                .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ')
  
  return newText;
}

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      allGoods: []
    }
  }

  getGoodsAll = () => {
    // const { token } = this.props;

    fetch(
      'https://adolloka.herokuapp.com/api/barang'
    )
    .then(async res => {
      if (res.status === 200) {
        const body = await res.json();
        this.setState({allGoods: body.data})
        console.log(body.data)
      }
    })
  }

  componentDidMount() {
    this.getGoodsAll();
  }

  render() {  
    return (
      <main className={styles.mainViewMainWrapper}>
        <section className={styles.productsSectionWrapper}>
          <div className={styles.wrapperTopLayer}>
            <div className={styles.wrapperSecondLayer}>
              <div className={styles.wrapperThirdLayer}>
                <div className={styles.wrapperFourthLayer}>
                  {/* {this.state.allGoods.map((el) => (
                  <>
                    <Link to={{
                      pathname: `/itempage/${el.id}`
                    }}>Item {el.id}</Link>
                    <div style={{marginRight: 24+'px'}}></div>
                  </>
                  ))} */}
                  {this.state.allGoods.map((el, key) => (
                    <div className={styles.productTopLayer} key={key}>
                      <div className={styles.productSecondLayer}>
                        <div className={styles.productThirdLayer}>
                          <div className={styles.productFourthLayer}>
                            <div className={styles.productFifthLayer}>
                              <div className={styles.productSixthLayer}>
                                <div className={styles.productImageWrapper}>
                                  <Link to={`/item/${el.toko.domain_toko}/${el.id}`}>
                                    <div className={styles.productImageLinkWrapper}>
                                      <img src={el.foto.length === 0 ? "/assets/product-pic.jpg" : el.foto[0]} width="188px" height="188px" alt="gambar sapi"/>
                                    </div>
                                  </Link>
                                </div>
                                <div className={styles.productSimpleDescWrapper}>
                                  <Link className={styles.productSimpleDescLink} to={`/item/${el.toko.domain_toko}/${el.id}`}>
                                    <div className={styles.productName}>{el.nama}</div>
                                    <div className={styles.productPrice}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR'}).format(el.harga)}</div>
                                    <div className={styles.productInformation}>
                                      <div className={styles.productShopWrapper}>
                                        <div className={styles.productShopInformation}>
                                          <span className={styles.productInformationText}>{toTitleCase(el.toko.kota)}</span>
                                          <span className={styles.productInformationText}>{toTitleCase(el.toko.nama_toko)}</span>
                                        </div>
                                      </div>
                                      {/* <div className={styles.productQuantityInformationWrapper}>
                                        <span className={styles.productQuantity}>Jumlah barang {el.jumlah}</span>
                                      </div> */}
                                    </div>
                                  </Link>
                                  <div className={styles.dotsOptionWrapper}>
                                    <div className={styles.threeDots} threedots="true">
                                      <img src="/assets/three-dots.svg" alt="option"/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default MainView;