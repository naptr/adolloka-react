import React from 'react';
import { Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { X } from 'react-bootstrap-icons';
import ReactLoading from 'react-loading';
import Skeleton from 'react-loading-skeleton';
import styles from '../../styles/User/User.module.css'


class AddressView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      newAddressLabel: '',
      newAddressName: '',
      newAddressPhone: '',
      newAddressDestination: '',
      newAddressPostalCode: '',
      newAddress: '',
      queryAddress: '',
      filteredAddress: [],
      selectedAddress: null,
      availablePostalCode: null,
      isValueSelected: false,
      addressWrapperVisibel: false,
      gettingAddressDataLoading: false,
      currentProvince: '',
      currentCity: '',
      currentSubdistrict: '',
      userTyping: 0,
      clickedId: null,
      addresses: [],
      newAddressesArray: [],
      addressSearch: '',
      filteredArray: [],
      filterClicked: false,
      showAddNewAddressModal: false,
      changeAddressClicked: false,
      gettingDataLoading: false
    }
  }

  // API related method
  getAddressAll = () => {
    const { token } = this.props;

    // this.setState(
    //   {gettingDataLoading: true}, 
    //   () => {
        fetch(
          'http://adolloka.herokuapp.com/api/user/alamat', 
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then(async res => {
          if (res.status === 200) {
            const body = await res.json();
    
            this.setState({
              addresses: body.data
            })
            console.log(body);
            console.log(this.state);
          }
          this.arrayChanger(this.state.addresses)
          this.submitSearch()
          this.setState({gettingDataLoading: false});
        })
        .catch(err => {
          console.log(err)
          this.setState({gettingDataLoading: false})
        })
    //   }
    // )
  }

  getUserData = () => {
    const { token } = this.props;

    this.setState(
      {gettingDataLoading: true}, 
      () => {
        fetch(
          'https://adolloka.herokuapp.com/api/user', 
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then( async res => {
          if (res.status === 200) {
            const body = await res.json();
            console.log(body)
            this.setState({userData: body})
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    )
  }

  changeActiveAddress = (number) => {
    const { token } = this.props;

    this.setState(
      { gettingDataLoading: true }, 
      () => {
        fetch(
          `https://adolloka.herokuapp.com/api/user/alamat/${number}/eneble`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )
          .then(async res => {
            if (res.status === 200) {
              console.log('Changing Success')
              this.getAddressAll()
              this.setState({ gettingDataLoading: true })
            } else {
              console.log('Changing Failed')
              this.setState({ gettingDataLoading: true })
            }
          })
          .catch(err => console.log(err))
      }
    )
    console.log(number)
  }

  getPostalCode = (subdistrict) => {
    this.setState(
      { gettingAddressDataLoading: true }, 
      () => {
        fetch(
          `https://kodepos.herokuapp.com/search?q=${subdistrict}`
        )
        .then(async res => {
          if (res.status === 200) {
            const body = await res.json();
            this.setState({ filteredAddress: body.data })
          } else {
            console.log(res.status)
          }
          this.setState({ gettingAddressDataLoading: false })
        })
        .catch(err => {
          console.log(err)
          this.setState({ gettingAddressDataLoading: false })
        })
      }
    )
  }

  // Custom Method
  arrayChanger = (array) => {
    var newArray = [];

    array.map(
      el => {
        if (el.status === 'eneble') {
          newArray.unshift(el)
        } else if (el.status === 'diseble') {
          newArray.push(el)
        }
        return null
      }
    ) 

    this.setState({newAddressesArray: newArray})
  }

  handleChange = (ev) => {
    const field = ev.target.name;

    this.setState({[field]: ev.target.value})
  }

  selectAddress = (el) => {
    this.setState({
      selectedAddress: `${el.province}, ${el.city}, ${el.subdistrict}, ${el.urban}`,
      currentProvince: el.province,
      currentCity: el.city, 
      currentSubdistrict: el.subdistrict,
      availablePostalCode: el.postalcode, 
      addressWrapperVisibel: false,
      newAddressDestination: ''
    })
  }

  submitSearch = () => {
    const { newAddressesArray, addressSearch } = this.state

    var filteredArray = newAddressesArray.filter(val => {
      // console.log(val.alamat.toLowerCase())
      if (addressSearch === "") {
        return val  
      } else if ((val.penerima).toLowerCase().includes(addressSearch.toLowerCase()) || (val.alamat).toLowerCase().includes(addressSearch.toLowerCase())) {
        return val
      }
    })

    if (addressSearch !== "") {
      this.setState({
        filteredArray: filteredArray,
        filterClicked: true
      })
    } else if (addressSearch === "") {
      this.setState({filterClicked: false})
    }
  }

  addressInputHandle = (ev) => {
    this.setState({ newAddressDestination: ev.target.value })
    if (this.state.userTyping) {
      clearTimeout(this.state.userTyping);
    }
    
    if ((this.state.newAddressDestination).length >= 3) {
      this.setState({
        // newAddressDestination: ev.target.value, 
        addressWrapperVisibel: true,
        userTyping: setTimeout(() => {
          this.getPostalCode(this.state.newAddressDestination)
        }, 1000)
      })
      console.log(ev.target.value)
    } else if ((this.state.newAddressDestination).length === 0) {
      this.setState({ 
        addressWrapperVisibel: false, 
        filteredAddress: [] 
      })
    }
  }

  // ComponentDid Method
  componentDidMount() {
    this.getUserData();
    this.getAddressAll();
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    const { 
      userData,
      newAddressLabel,
      newAddressName,
      newAddressPhone,
      newAddressDestination,
      newAddressPostalCode,
      newAddress,
      filteredAddress,
      selectedAddress,
      addressWrapperVisibel,
      gettingAddressDataLoading,
      clickedId,
      // addresses, 
      newAddressesArray, 
      // addressSearch, 
      filteredArray, 
      filterClicked, 
      showAddNewAddressModal,
      changeAddressClicked,
      gettingDataLoading 
    } = this.state
    
    return (
      <>
        <div className={styles.searchBarAddButtonWrapper}>
          <div className={styles.addressSearcBarWrapper}>
            <div className={styles.addressSearcBar}>
              <button className={styles.addressSearchBarButton} height="auto" width={300 + 'px'} onClick={this.submitSearch}>
                <Search color="rgba(108, 117, 125, 0.3)" size={18} />
              </button>
              <input name="addressSearch" placeholder="Search address or receiver name" className={`${styles.searchBarInput} ${styles.inputSearch}`} onChange={this.handleChange} />
            </div>
          </div>
          <button
            className={styles.newAddressAddButton}
            onClick={() => {
              this.getPostalCode('tirtohargo')
              this.setState({ showAddNewAddressModal: true })
            }}
          >
            <span>Add New Address</span>
          </button>
        </div>
        {
          gettingDataLoading ?
          <>
            <section className={styles.loadingSection}>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <Skeleton width={40} height={18} />
                <Skeleton width={80} height={20} />
                <Skeleton width={102} height={18} />
                <Skeleton width={62} height={18} />
              </div>
            </section>
            <section className={styles.loadingSection}>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <Skeleton width={40} height={18} />
                <Skeleton width={80} height={20} />
                <Skeleton width={102} height={18} />
                <Skeleton width={62} height={18} />
              </div>
            </section>
              <section className={styles.loadingSection}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <Skeleton width={40} height={18} />
                  <Skeleton width={80} height={20} />
                  <Skeleton width={102} height={18} />
                  <Skeleton width={62} height={18} />
                </div>
              </section>
          </> :
          <>
            {(filterClicked ? filteredArray : newAddressesArray).map((el, key) => (
              <section key={key} className={`${el.status === 'eneble' ? styles.addressCardActivated : styles.addressCardNonActivated}`}>
                <div style={{ paddingRight: 16 + 'px', position: 'relative', zIndex: 1 }}>
                  <h5 className={styles.addressKindWrapper} style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.addressKindName}>{el.jns_alamat}</span>
                  </h5>
                  <h4 className={styles.receiverNameWrapper}>
                    <span className={styles.receiverName}>{el.penerima}</span>
                  </h4>
                  <p className={styles.paragraphStyle}>{el.no_hp}</p>
                  <p className={styles.paragraphStyle}>
                    <span className={styles.addressName}>{el.alamat}</span>
                  </p>
                  {/* <p></p> */}
                  <div style={{ marginTop: 16 + 'px' }} className={styles.addressSettings}>
                    <div>
                      <Link 
                        to={`/user/${userData === null ? null : userData.user.id}?tab=address`} 
                        onClick={() => {
                          console.log("THIS IS DIVS")
                          this.setState({
                            showAddNewAddressModal: true, 
                            changeAddressClicked: true, 
                            clickedId: key
                          })
                        }} 
                        className={styles.activeLink}
                      >
                        <b>Ubah</b>
                      </Link>
                    </div>
                    {
                      el.status === 'diseble' ?
                        <>
                          <div>
                            <Link 
                              to={`/user/${userData === null ? null : userData.user.id}?tab=address`}
                              onClick={() => {
                                console.log("THIS IS DIVS")
                                // this.changeActiveAddress(el.id)
                              }} 
                              className={styles.activeLink}
                            >
                              <b>Jadikan Alamat Utama & Pilih</b>
                            </Link>
                          </div>
                          <div>
                            <Link 
                              to={`/user/${userData === null ? null : userData.user.id}?tab=address`}
                              onClick={() => console.log("THIS IS DIVS")} className={styles.activeLink}
                            >
                              <b>Hapus</b>
                            </Link>
                          </div>
                        </> :
                        null
                    }
                  </div>
                </div>
                {
                  el.status === 'eneble' ?
                    <div className={styles.activatedAddressIcon}>
                      <picture className={styles.iconWrapper}>
                        <img className={styles.activatedIcon} alt="activated" src="/assets/check.svg" />
                      </picture>
                    </div> :
                    <button
                      onClick={() => this.changeActiveAddress(el.id)}
                      className={`${styles.activateButtonStyle} ${styles.activateButton}`}
                    >
                      Pilih
            </button>
                }
              </section>
            ))}
          </>
        }
        <div>
          {
            showAddNewAddressModal ?
              <>
                <div className={styles.modalOverlay}></div>
                <div className={styles.modalBox} style={{padding: 48+'px'}}>
                  <X
                    size={24}
                    onClick={() => {
                      changeAddressClicked ? 
                      this.setState({ 
                        showAddNewAddressModal: false, 
                        changeAddressClicked: false
                      }) : 
                      this.setState({ showAddNewAddressModal: false })
                    }}
                    className={styles.closeButton}
                  />
                <h2 className={styles.modalBoxTitle}>{changeAddressClicked ? 'Ubah Alamat' : 'Tambah Alamat Baru'}</h2>
                  <p className={styles.modalBoxSubtitle}>Pastikan anda mengisi seluruh form yang ada.</p>
                  <div className={styles.modalBoxFormWrapper}>
                    <label className={styles.nameLabel}>Label Alamat</label>
                    <div className={styles.formInputWrapper}>
                      <div className={styles.inputWrapper}>
                        {/* email.inputFocused ? styles.inputWrapperFocused : */}
                        {/* {console.log(newAddressesArray[clickedId])} */}
                        <input 
                          name="newAddressLabel" 
                          className={`${styles.inputBox} ${styles.globalStyling}`} 
                          value={changeAddressClicked ? 
                            (filteredArray.length !== 0 ? 
                              filteredArray[clickedId].jns_alamat : 
                              newAddressesArray[clickedId].jns_alamat) : 
                              newAddressLabel} 
                          onChange={this.handleChange} 
                          onFocus={this.focusFunction} />
                        {/* email.value */}
                      </div>
                    </div>
                    <div className={styles.doubleFormWrapper}>
                      <div className={styles.perProfileFormWrapper}>
                        <label className={styles.nameLabel}>Nama Penerima</label>
                        <div className={styles.formInputWrapper}>
                          <div className={styles.inputWrapper}>
                            {/* phoneNumber.inputFocused ? styles.inputWrapperFocused : */}
                            <input
                              name="newAddressName"
                              className={`${styles.inputBox} ${styles.globalStyling}`}
                              value={changeAddressClicked ? 
                                (filteredArray.length !== 0 ? 
                                  filteredArray[clickedId].penerima : 
                                  newAddressesArray[clickedId].penerima) : 
                                  newAddressName}
                              onChange={() => console.log('test')}
                              onFocus={this.focusFunction} />
                            {/* phoneNumber.value */}
                          </div>
                        </div>
                      </div>
                      <div className={styles.perProfileFormWrapper}>
                        <label className={styles.nameLabel}>No. Ponsel</label>
                        <div className={styles.formInputWrapper}>
                          <div className={styles.inputWrapper}>
                            {/* phoneNumber.inputFocused ? styles.inputWrapperFocused : */}
                            <input 
                              type="tel" 
                              name="newAddressPhone" 
                              className={`${styles.inputBox} ${styles.globalStyling}`} 
                              value={changeAddressClicked ? 
                                (filteredArray.length !== 0 ? 
                                  filteredArray[clickedId].no_hp : 
                                  newAddressesArray[clickedId].no_hp) : 
                                  newAddressPhone}
                              onChange={() => console.log('test')} 
                              onFocus={this.focusFunction} />
                            {/* phoneNumber.value */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.doubleFormWrapper}>
                      <div className={styles.cityFormWrapper}>
                        <div className={styles.cityFormInsideWrapper}>
                          <label className={styles.nameLabel}>Kota atau Kecamatan</label>
                          <div className={styles.formInputWrapper}>
                            <div className={styles.inputWrapper}>
                              {/* phoneNumber.inputFocused ? styles.inputWrapperFocused : */}
                              <input
                                name="newAddressDestination"
                                className={`${styles.inputBox} ${styles.globalStyling}`}
                                // value={changeAddressClicked ? (filteredArray.length !== 0 ? filteredArray[clickedId].penerima : newAddressesArray[clickedId].penerima) : newAddressDestination}
                                value={selectedAddress ? selectedAddress : newAddressDestination}
                                onChange={this.addressInputHandle}
                                onFocus={this.focusFunction} />
                              {/* phoneNumber.value */}
                            </div>
                          </div>
                          {
                            addressWrapperVisibel ?
                              <div className={styles.addressFilteredChoices}>
                                {
                                  gettingAddressDataLoading ?
                                    <div>

                                    </div> :
                                    <>
                                      <p className={styles.addressSearchHeading}>Untuk mempersingkat waktu, isi dengan kecamatan tujuan pengiriman</p>
                                      <ul className={styles.addressListChoices}>
                                        {filteredAddress.map((el, key) => (
                                          <li className={styles.listItem} style={{ backgroundImage: 'url("/assets/geo-alt-fill.svg")', backgroundSize: 14 + 'px' }} onClick={() => this.selectAddress(el)}>
                                            <div className={styles.filteredAddressChoice} style={{paddingLeft: 32+'px'}} tabIndex={0} role="button">
                                              <div className={styles.filteredAddressPoint}>{el.province}, {el.city}, {el.subdistrict}, {el.urban}</div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </>
                                }
                              </div> :
                              null
                          }
                        </div>
                      </div>
                      <div className={styles.postalCodeFormWrapper}>
                        <label className={styles.nameLabel}>Kode Pos</label>
                        <div className={styles.formInputWrapper}>
                          <div className={styles.inputWrapper}>
                            {/* phoneNumber.inputFocused ? styles.inputWrapperFocused : */}
                            <input
                              name="newAddressPostalCode"
                              className={`${styles.inputBox} ${styles.globalStyling}`}
                              // value={changeAddressClicked ? (filteredArray.length !== 0 ? filteredArray[clickedId].no_hp : newAddressesArray[clickedId].no_hp) : newAddressPostalCode}
                              value={newAddressPostalCode}
                              onChange={() => console.log('postal code')}
                              onFocus={this.focusFunction} />
                            {/* phoneNumber.value */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <label className={styles.nameLabel}>Alamat</label>
                    <div className={styles.formInputWrapper}>
                      <div className={styles.inputWrapper}>
                        {/* email.inputFocused ? styles.inputWrapperFocused : */}
                        {/* {console.log(newAddressesArray[clickedId])} */}
                        <input name="newAddress" className={`${styles.inputBox} ${styles.globalStyling}`}
                          // value={changeAddressClicked ? (filteredArray.length !== 0 ? filteredArray[clickedId].alamat : newAddressesArray[clickedId].alamat) : newAddressLabel}
                          value={newAddress}
                          onChange={this.handleChange}
                          onFocus={this.focusFunction} />
                        {/* email.value */}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={changeAddressClicked ? this.changeAddressSubmit : this.addAddressSubmit}
                    className={styles.submitButtonDisabled}
                    // {
                    // ...this.isContactFormFilled() ?
                    //   null :
                    //   { disabled: 'disabled' }
                    // }
                    disabled
                  >
                    {/* this.isContactFormFilled() ? styles.submitButtonEnabled : */}
                    {/* {
              submitDataLoading ?
                <span className={styles.loadingSpan}>
                  <ReactLoading type="bubbles" color="#fff" />
                </span> :
                <span>Save</span>
            } */}
                    <span>Save</span>
                  </button>
                </div>
              </> :
              <span></span>
          }
        </div>
      </>
    )
  }
}

export default AddressView;