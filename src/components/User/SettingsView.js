import React from 'react';
// import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Loader from 'react-loader-spinner';
// import 'react-dropdown/style.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link } from 'react-router-dom';
import styles from '../../styles/User/User.module.css';
import { X } from 'react-bootstrap-icons';
import ReactLoading from 'react-loading';
// import { stringify } from 'query-string';


// Custom Components
// Loading Components
// Loading Skeleton
const LoadingView = (props) => {
  const { width, height } = props;
  
  return (
    <>
      <Skeleton width={width} height={height}/>
    </>
  )
  // return null
}

// Loading Page
const LoadingViewUpload = () => {
  return (
    <div className={styles.uploadLoadingContainer}>
      <div style={{ position: 'relative', zIndex: 500 }}>
        <Loader type="TailSpin" color="#3A86FF" width={64} height={64} />
      </div>
      <div className={styles.backgroundOverlay}></div>
    </div>
  )
}

// Name Components
// class NameInput extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       name: ''
//     }
//   }

//   handleChange = (ev) => {
//     var field = ev.target.name;
//     this.setState({[field]: ev.target.value})
//   }

//   render() {
//     const { parentName } = this.props;

//     return (
//       name.bool ?
//       <>
//         <label className={styles.nameLabel}>Name</label>
//         <div className={styles.formInputWrapper}>
//           <div className={name.inputFocused ? styles.inputWrapperFocused : styles.inputWrapper}>
//             <input name="name" className={`${styles.inputBox} ${styles.globalStyling}`} value={name.value} onChange={this.handleChange} onFocus={this.focusFunction} />
//           </div>
//         </div>

//       </> :
//       <>
//         <div className={styles.formInputWrapper}>
//           {name.showInputBox ?
//             <>
//               <label className={styles.nameLabel}>Name</label>
//               <div className={styles.inputWrapper}>
//                 <input name="name" className={`${styles.inputBox} ${styles.globalStyling}`} onChange={this.handleChange} value={name.value} onFocus={this.focusFunction} />
//               </div>
//             </> :
//             <>
//               <Link
//                 to="#"
//                 className={styles.nameInputLink}
//                 onClick={() => this.setState({
//                   name: {
//                     ...name,
//                     showInputBox: true
//                   }
//                 })}
//               >
//                 Add Name
//                     </Link></>}
//         </div>
//       </>
//     )
//   }
// }

// Some Functions
const dateFormatter = (date) => {
  var splittedDate = date.split("-");
  var year = splittedDate[0];
  var month = splittedDate[1];
  var day = splittedDate[2];

  const monthParser = (month) => {
    switch (month) {
      case '01':
        return 'Januari';
      case '02':
        return 'Februari';
      case '03':
        return 'Maret';
      case '04':
        return 'April';
      case '05':
        return 'Mei';
      case '06':
        return 'Juni'
      case '07':
        return 'Juli';
      case '08':
        return 'Agustus';
      case '09':
        return 'September';
      case '10':
        return 'Oktober';
      case '11':
        return 'November';
      case '12':
        return 'Desember';
      default:
        return null
    }
  }

  return `${day} ${monthParser(month)} ${year}`
  // console.log(splittedDate)
  // console.log(stringedDate)
  // console.log(year)
}

const genderFormatter = (gender) => {
  switch (gender) {
    case 'L':
      return 'Laki-laki';
    case 'P':
      return 'Perempuan';
    default:
      return 'Lainnya'
  }
}

// const genderReverseFormatter = (gender) => {
//   switch (gender) {
//     case 'perempuan':
//       return 'P';
//     case 'laki-laki':
//       return 'L';
//     default:
//       return 'Lainnya';
//   }
// }

const phoneFormatter = (phoneNum) => {
  var firstDigit = phoneNum.slice(0, 1);
  var formattedDigit = firstDigit.replace('0', '62');

  return `${formattedDigit}${phoneNum.slice(1)}`
}

const monthFormatter = (value) => {
  switch (value) {
    case '01':
      return 'Januari';
    case '02':
      return 'Februari';
    case '03':
      return 'Maret';
    case '04':
      return 'April';
    case '05':
      return 'Mei';
    case '06':
      return 'Juni';
    case '07':
      return 'Juli';
    case '08':
      return 'Agustus';
    case '09':
      return 'September';
    case '10':
      return 'Oktober';
    case '11':
      return 'November';
    case '12':
      return 'Desember';
    default:
      return value;
  }
}

const nonYearFormatter = (value) => {
  var stringifiedValue = value.toString();

  if (stringifiedValue.length < 2) {
    stringifiedValue = '0'+stringifiedValue
  }

  // console.log(stringifiedValue);
  return stringifiedValue;
}

class SettingsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserData: null,
      uploadedPhoto: null,
      userDataLoading: true,
      uploadLoading: false,
      submitDataLoading: false, 
      submitAddressLoading: false,
      showUserBioInformationModal: false,
      showUserContactInformationModal: false,
      showUserAddressInformationModal: false,
      name: {
        value: '', 
        bool: false, 
        showInputBox: false, 
        inputFocused: false
      },
      birthdate: {
        value: {
         day: {
           value: '', 
           bool: false,
           dropdownOpen: false
         }, 
         month: {
           value: '', 
           bool: false, 
           dropdownOpen: false
         }, 
         year: {
           value: '',
           bool: false, 
           dropdownOpen: false
         }
        }, 
        bool: false, 
        showInputBox: false
      },
      gender: { 
        value: '',
        bool: false, 
        showInputBox: false
      }, 
      radioSelectedOption: '',
      email: {
        value: '',
        inputFocused: false
      }, 
      phoneNumber: {
        value: '',
        inputFocused: false
      },
      address: {
        value: '',
        inputFocused: false
      }
    }

    // this.size = React.createRef();
  }

  // Custom components
  Dropdown = (props) => {
    const { width, value, dateSize, startPoint, partOf } = props;
    const { dropdownOpen } = this.state.birthdate.value[partOf];

    if (this.state.birthdate.value[partOf] !== undefined) {
      return (
        <>
          <div style={{width: width+'px'}} className={`${dropdownOpen ? styles.dropdownOpened : styles.dropdownDefault} ${styles.dateDropdown}`} >
            <button className={`${styles.defaultButton} ${styles.dateButton}`} onClick={() => {
              console.log(this.state.birthdate);
              this.setState({
                birthdate: {
                  ...this.state.birthdate,
                  value: {
                    ...this.state.birthdate.value,
                    [partOf]: {
                      value: value,
                      bool: true,
                      dropdownOpen: !this.state.birthdate.value[partOf].dropdownOpen
                    }
                  }, 
                  showInputBox: true
                }
              });
            }}>
              <label className={`${styles.defaultLabel} ${styles.dateLabel}`}>
                {<span>{this.state.birthdate.value[partOf] === this.state.birthdate.value.month ? monthFormatter(value.toString()) : value}</span>}
              </label>
            </button>
            <div className={`${styles.dateNumberListWrapper} ${styles.dateNumberList}`}>
              <ul role="listbox" {...dropdownOpen ? { tabIndex: "-1" } : null} className={styles.dateListWrapper}>
                {[...Array(dateSize).keys()].map((el, key) => (
                  <li role="option" key={key} className={styles.dateListButton} aria-selected="true">
                    <button onClick={() => {
                      console.log(el+startPoint);
                      this.setState({
                        birthdate: {
                          ...this.state.birthdate, 
                          value: {
                            ...this.state.birthdate.value, 
                            [partOf]: {
                              bool: true, 
                              value: (this.state.birthdate.value[partOf] === this.state.birthdate.value.year ? el+startPoint : nonYearFormatter(el+startPoint)).toString(),
                              dropdownOpen: !this.state.birthdate.value[partOf].dropdownOpen
                            }
                          } 
                        }
                      });
                    }}>
                      <span>{this.state.birthdate.value[partOf] === this.state.birthdate.value.month ? monthFormatter((nonYearFormatter(el+startPoint)).toString()) : nonYearFormatter(el+startPoint)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )
    }
  }

  // Fetching data method
  getUserData = () => {
    const { token } = this.props;

    // this.setState(
      // { userDataLoading: true }, 
      console.log(this.state)
      fetch(
        'https://adolloka.herokuapp.com/api/user', 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then(async (res) => {
        var data;
        if (res.status === 200) {
          const body = await res.json();
          data = body;

          this.setState({
            currentUserData: data, 
            email: {
              value: data.user.email
            }, 
            phoneNumber: {
              value: data.user.no_hp
            }, 
            address: {
              ...this.state.address,
              value: (data.user.profile === null ? [] : (data.alamat.length === 0 ? [] : data.alamat[0].alamat))
            }
          })
          // console.log(data.alamat.length === 0)

          if (data.user.profile === null) {
            this.setState({ userDataLoading: false })
            return null
          } else if (data.profile) {
            if (data.profile.nama === null && data.profile.tgl_lahir === null && data.profile.gender === null) {
              this.setState({
                name: {
                  value: '', 
                  bool: false, 
                  showInputBox: false
                },
                userDataLoading: false
              })  
            } else {
              this.setState({
                name: {
                  value: data.profile.nama, 
                  bool: true
                },
                birthdate: {
                  value: data.profile.tgl_lahir, 
                  bool: true
                }, 
                gender: {
                  value: data.profile.gender, 
                  bool: true
                },
                userDataLoading: false
              })
            }
          } else {
            this.setState({ userDataLoading: false })
            return null
          }
        }
        console.log(this.state.currentUserData)
        console.log(this.state)
      })
      .catch(err => console.log(err))
    // )
  }

  photoProfileUpdate = (params) => {
    const { token } = this.props;
    var formData = new FormData();
    formData.append("foto", params);

    this.setState(
      {uploadLoading: true}, 
      () => {
        fetch(
          'http://adolloka.herokuapp.com/api/user/profile/foto/update',
          {
            method: 'POST', 
            headers: {
              'Authorization': `Bearer ${token}`
            }, 
            body: formData

          }
        )
        .then(async res => {
          if (res.status === 200) {
            // this.getUserData();
            this.setState({ uploadLoading: false });
          }
          console.log("updating data success");
        })
        .catch(err => this.setState(
          {uploadLoading: false}, 
          () => {
            alert(`error updating data. Error: ${err}`)
          }
        ))
      }
    )
  }
  
  userProfileInfoSubmitButton = () => {
    const { token } = this.props;
    const { 
      name, 
      birthdate, 
      gender 
    } = this.state;

    var formData = new FormData();
    formData.append('nama', name.value);
    formData.append('gender', gender.value);
    if (birthdate.bool) {
      formData.append('tgl_lahir', birthdate.value);
    } else {
      formData.append('tgl_lahir', `${birthdate.value.year.value}-${birthdate.value.month.value}-${birthdate.value.day.value}`)
    }

    this.setState(
      {submitDataLoading: true}, 
      () => {
        fetch(
          'http://adolloka.herokuapp.com/api/user/profile/biodata/update', 
          {
            method: 'POST', 
            headers: {
              'Authorization': `Bearer ${token}`
            }, 
            body: formData
          }
        )
        .then(async res => {
          if (res.status === 200) {
            this.setState({
              submitDataLoading: false, 
              showUserBioInformationModal: false
            });
            console.log('Updating data success')
          }
        })
        .catch(err => {
          this.setState({
            submitDataLoading: false, 
            showUserBioInformationModal: false
          });
          alert('Something went wrong')
        })
      }
    )
  }

  userContactInfoSubmitButton = () => {
    console.log(this.state.email);
    console.log(this.state.phoneNumber);
  }

  userAddressInfoSubmitButton = () => {
    const { token } = this.props;
    const { address, currentUserData } = this.state;  

    var formData = new FormData();
    formData.append('alamat', address.value);
    formData.append('penerima', (currentUserData.user.profile === null ? currentUserData.user.username : (currentUserData.alamat.length === 0 ? (currentUserData.profile === null ? 'Null' : currentUserData.profile.nama) : currentUserData.alamat[0].penerima)))
    formData.append('no_hp', (currentUserData.user.profile === null ? parseInt(currentUserData.no_hp) : (currentUserData.alamat.length === 0 ? parseInt(currentUserData.user.no_hp) : parseInt(currentUserData.alamat[0].no_hp))))

    this.setState(
      {submitAddressLoading: true}, 
      () => {
        fetch(
          'http://adolloka.herokuapp.com/api/user/profile/alamat/update',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          }
        )
        .then(async res => {
          if (res.status === 200) {
            this.setState({
              submitAddressLoading: false, 
              showUserAddressInformationModal: false
            })
            console.log('Updating data Success')
          } else if (res.status === 500) {
            alert('Mohon isi Data Profile terlebih dahulu')
            this.setState({
              submitAddressLoading: false,
              showUserAddressInformationModal: false
            })
          }
        })
        .catch(err => {
          this.setState({
            submitAddressLoading: false, 
            showUserAddressInformationModal: false
          })
          alert('Upadate data Failed')
        })
      }
    )
  }

  // Custom method for handling something
  onFileChange = (ev) => {
      console.log(ev.target.files)
      if (ev.target.files && ev.target.files[0]) {
        let img = ev.target.files[0];
        // this.setState({uploadedPhoto: URL.createObjectURL(params)})
        this.setState({ uploadedPhoto: URL.createObjectURL(img) });
        this.photoProfileUpdate(img);
      // this.photoProfileUpdate(this.state.uploadedPhoto);
    }
  }

  radioHandleChange = (ev) => {
    const field = ev.target.name;
    this.setState({ 
      [field]: {
        ...this.state[field], 
        showInputBox: true, 
        value: ev.target.value
      } 
    })
    this.setState({ radioSelectedOption: ev.target.value});
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    this.setState({ 
      [field]: {
        value: ev.target.value,
        // bool: true, 
        showInputBox: true,
        inputFocused: true
      }
    })
  }

  nonBioHandleChange = (ev) => {
    const field = ev.target.name;
    this.setState({
      [field]: {
        value: ev.target.value, 
        inputFocused: true
      }
    })
  }

  contactHandleChange = (ev) => {
    const field = ev.target.name;
    this.setState({[field]: {
      value: ev.target.value
    }})
  }

  isBioFormFilled = () => {
    const {
      name, 
      birthdate, 
      gender
    } = this.state

    if (name.value === '' || birthdate.value === '' || gender.value === '') {
      return false
    } else {
      return true
    }
  }

  isContactFormFilled = () => {
    const {
      email, 
      phoneNumber
    } = this.state

    if (email.value === '' || phoneNumber.value === '') {
      return false
    } else {
      return true
    }
  }

  isAddressFormFilled = () => {
    const { address } = this.state

    if (address.value === '') {
      return false
    } else {
      return true
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate() {
    console.log(this.state.gender)
  }

  render() {
    const { 
      uploadedPhoto, 
      currentUserData, 
      userDataLoading, 
      uploadLoading,
      submitDataLoading, 
      submitAddressLoading,
      showUserBioInformationModal,
      showUserContactInformationModal,
      showUserAddressInformationModal,
      name, 
      birthdate, 
      gender, 
      radioSelectedOption,
      email, 
      phoneNumber, 
      address
    } = this.state;

    return (
      <>
      {console.log(this.state)}
        {
          userDataLoading ? 
          <>
            <div className={styles.settingsViewPhotoSection}>
              <LoadingView width={290} height={290} />
              <div style={{ marginTop: 16 + 'px' }}></div>
              <LoadingView width={290} height={40} />
            </div>
            <div className={styles.settingsViewInformationSection}>
              <LoadingView width={400} height={20} />
              <div style={{ marginTop: 32 + 'px'}}></div>
              <LoadingView width={400} height={20} />
              <div style={{ marginTop: 16 + 'px'}}></div>
              <LoadingView width={400} height={20} />
              <div style={{ marginTop: 16 + 'px' }}></div>
              <LoadingView width={400} height={20} />
              <div style={{ marginTop: 16 + 'px', marginBottom: 32+'px' }}></div>
              <LoadingView width={400} height={20} />
              <div style={{ marginTop: 32 + 'px' }}></div>
              <LoadingView width={400} height={20} />
              <div style={{ marginTop: 16 + 'px' }}></div>
              <LoadingView width={400} height={20} />
              <div style={{ marginTop: 16 + 'px' }}></div>
            </div>
          </> : 
          <>
          {
            uploadLoading ? 
            <LoadingViewUpload /> : 
            <>
              <div className={styles.settingsViewPhotoSection}>
                <section className={styles.photoUploadSection}>
                  <input 
                    className={styles.photoUploadInput} 
                    type="file" 
                    accept="image/jpeg, .jpeg, .jpg, image/png, .png"
                    onChange={this.onFileChange}
                  />
                  <picture className={styles.photoWrapper}>
                    <img src={uploadedPhoto === null ? (currentUserData.user.profile === undefined ? (currentUserData.profile.foto === null ? "/assets/user-alt-icon.png" : currentUserData.profile.foto.foto) : "/assets/user-alt-icon.png")  : uploadedPhoto} alt="profile" className={styles.photoFrame}/>
                  </picture>
                  <button className={styles.photoUploadButton}>
                    <span>Choose Photo</span>
                  </button>
                  <p className={styles.photoUploadInformation}>
                    Untuk sementara tidak ada batas ukuran file yang dapat diupload, namun ke depannya akan terdapat beberapa update. <br/>
                    Ekstensi yang diperbolehkan: .JPG, .JPEG, .PNG
                  </p>
                </section>
                <button className={styles.passwordButton}>
                  <span>Change Password</span>
                </button>
              </div>
              <div className={styles.settingsViewInformationSection}>
                <div className={styles.userInformationMainWrapper} style={{marginTop: 12+'px'}}>
                  <p className={styles.userInformationMainTitle}>Ubah Biodata Diri</p>
                  <Link to="#" className={styles.userInformationChangeLink} onClick={() => this.setState({showUserBioInformationModal: true})}>Change</Link>
                </div>
                <div className={styles.userInformationNameWrapper}>
                  <span className={styles.userInformationTitle}>Nama</span>
                  <span className={styles.userInformationContent}>{currentUserData === null ? null : (currentUserData.user.profile === null ? null : (currentUserData.profile.nama === null ? null : currentUserData.profile.nama))}</span>
                </div>
                <div className={styles.userInformationNameWrapper}>
                  <span className={styles.userInformationTitle}>Tanggal Lahir</span>
                  <span className={styles.userInformationContent}>{currentUserData === null ? null : (currentUserData.user.profile === null ? null : (currentUserData.profile.tgl_lahir === null ? null : dateFormatter(currentUserData.profile.tgl_lahir)))}</span>
                </div>
                <div className={styles.userInformationNameWrapper}>
                  <span className={styles.userInformationTitle}>Gender</span>
                  <span className={styles.userInformationContent}>{currentUserData === null ? null : (currentUserData.user.profile === null ? null : (currentUserData.profile.gender === null ? null : genderFormatter(currentUserData.profile.gender)))}</span>
                </div>
                <div className={styles.userInformationMainWrapper}>
                  <p className={styles.userInformationMainTitle}>Ubah Informasi Kontak</p>
                  <Link to="#" className={styles.userInformationChangeLink} onClick={() => this.setState({showUserContactInformationModal: true})}>Change</Link>
                </div>
                <div className={styles.userInformationNameWrapper}>
                  <span className={styles.userInformationTitle}>Email</span>
                  <span className={styles.userInformationContent}>{currentUserData === null ? null : currentUserData.user.email}</span>
                </div>
                <div className={styles.userInformationNameWrapper}>
                  <span className={styles.userInformationTitle}>Nomor Telepon</span>
                  <span className={styles.userInformationContent}>{currentUserData === null ? null : phoneFormatter(currentUserData.user.no_hp)}</span>
                </div>
                <div className={styles.userInformationMainWrapper}>
                  <p className={styles.userInformationMainTitle}>Ubah Informasi Alamat</p>
                  <Link to="#" className={styles.userInformationChangeLink} onClick={() => this.setState({ showUserAddressInformationModal: true })}>Change</Link>
                </div>
                <div className={styles.userInformationNameWrapper}>
                  <span className={styles.userInformationTitle}>Alamat</span>
                  <span className={styles.userInformationContentAddress}>{currentUserData.alamat.length === 0 ? null : currentUserData.alamat[0].alamat}</span>
                </div>
              </div>
            </>
          }
          </>
        }
        <div>
          {
            showUserBioInformationModal ? 
            <>
              <div className={styles.modalOverlay}></div>
              <div className={styles.modalBox}>
                <X 
                  size={24} 
                  onClick={() => this.setState({ 
                    showUserBioInformationModal: false, 
                    // name: {
                    //   value: '',
                    //   bool: false,
                    //   showInputBox: false
                    // },
                    // birthdate: {
                    //   value: {
                    //     day: {
                    //       value: '',
                    //       bool: false,
                    //       dropdownOpen: false
                    //     },
                    //     month: {
                    //       value: '',
                    //       bool: false,
                    //       dropdownOpen: false
                    //     },
                    //     year: {
                    //       value: '',
                    //       bool: false,
                    //       dropdownOpen: false
                    //     }
                    //   },
                    //   bool: false,
                    //   showInputBox: false
                    // },
                    // gender: {
                    //   value: '',
                    //   bool: false,
                    //   showInputBox: false
                    // }
                  })} 
                  className={styles.closeButton} 
                />
                <h2 className={styles.modalBoxTitle}>Ubah Biodata Diri</h2>
                <p className={styles.modalBoxSubtitle}>Data yang ada dalam Biodata ini bersifat penting.<br/>Pastikan biodata dirimu sudah terisi dengan benar.</p>
                <div className={styles.modalBoxFormWrapper}>
                    {/* <NameInput parentName={name} onChange={this.handleChange} onFocus={this.focusFunction} /> */}
                  {
                    name.bool ?
                    <>
                      <label className={styles.nameLabel}>Name</label>
                      <div className={styles.formInputWrapper}>
                        <div className={name.inputFocused ? styles.inputWrapperFocused : styles.inputWrapper}>
                          <input name="name" className={`${styles.inputBox} ${styles.globalStyling}`} value={name.value} onChange={this.handleChange} onFocus={this.focusFunction}/>
                        </div>
                      </div>
                      
                    </> :
                    <>
                      <div className={styles.formInputWrapper}>
                        {name.showInputBox ?
                          <>
                            <label className={styles.nameLabel}>Name</label>
                            <div className={styles.inputWrapper}>
                              <input name="name" className={`${styles.inputBox} ${styles.globalStyling}`} onChange={this.handleChange} value={name.value} onFocus={this.focusFunction}/>
                            </div>
                          </> :
                          <>
                            <Link
                              to="#"
                              className={styles.nameInputLink}
                              onClick={() => this.setState({
                                name: {
                                  ...name,
                                  showInputBox: true
                                }
                              })}
                            >
                              Add Name
                      </Link></>}
                      </div>
                    </>
                  }
                  {
                    birthdate.bool ? 
                    <>
                      <label className={styles.nameLabel}>Birthdate</label>
                      <div className={styles.formInputWrapper}>
                          <div className={styles.inputWrapper}>
                            <input disabled name="birthdate" className={`${styles.inputBox} ${styles.globalStyling}`} value={dateFormatter(birthdate.value)} />
                          </div>
                      </div>
                    </> :
                    <>
                      {birthdate.showInputBox ?
                        <div className={styles.birtdateFormWrapper}>
                          <>
                            {/* <label className={styles.nameLabel}>Birthdate</label> */}
                            <this.Dropdown 
                              partOf="day" 
                              width={100} 
                              value={birthdate.value.day.bool ? birthdate.value.day.value : 'Date'} 
                              dateSize={31}
                              startPoint={1}/>
                            <this.Dropdown
                              partOf="month" 
                              width={184} 
                              value={birthdate.value.month.bool ? birthdate.value.month.value : 'Month'} 
                              dateSize={12}
                              startPoint={1}/>
                            <this.Dropdown 
                              partOf="year"
                              width={100}
                              value={birthdate.value.year.bool ? birthdate.value.year.value : 'Year'}
                              dateSize={80}
                              startPoint={1941}/>
                            {/* <h1>show input box</h1> */}
                          </>
                        </div>
                             :
                        <div className={styles.formInputWrapper}>
                          <> 
                            <Link 
                              to="#"
                              className={styles.nameInputLink} 
                              onClick={() => this.setState({ 
                                birthdate: {
                                  ...birthdate, 
                                  showInputBox: true
                                } 
                              })}
                            >
                              Add Birthdate
                            </Link>
                          </>
                        </div>
                        }
                    </>
                  }
                  {
                    gender.bool ? 
                    <>
                      <label className={styles.nameLabel}>Gender</label>
                      <div className={styles.formInputWrapper}>
                          <div className={styles.inputWrapper}>
                              <input disabled name="gender" className={`${styles.inputBox} ${styles.globalStyling}`} value={genderFormatter(gender.value)} />
                          </div>
                      </div>
                    </> :
                    <>
                      <div className={styles.formInputWrapper}>
                        {gender.showInputBox ?
                          <>
                            <div className={styles.genderFormWrapper}>
                              <div className={styles.genderFormWrapper}>
                                <div className={styles.radioButtonWrapper}>
                                  <label className={styles.radioButtonWrapper}>
                                    <input type="radio" className={styles.radioButtonInput} checked={radioSelectedOption === 'L'} onChange={this.radioHandleChange} value='L' name="gender" />
                                    <span 
                                      className={`${styles.radioButtonSpan} ${styles.afterSelected}`}  
                                    >
                                    </span>
                                  </label>
                                </div>
                                <img src="/assets/male.svg" className={styles.genderLogo} alt="male" />
                                <label>Male</label>
                              </div>
                              <div className={styles.genderFormWrapper}>
                                <div className={styles.radioButtonWrapper}>
                                  <label className={styles.radioButtonWrapper}>
                                    <input type="radio" className={styles.radioButtonInput} checked={radioSelectedOption === 'P'} onChange={this.radioHandleChange} value='P' name="gender" />
                                    <span
                                      className={`${styles.radioButtonSpan} ${styles.afterSelected}`}
                                    >
                                    </span>
                                  </label>
                                </div>
                                <img src="/assets/female.svg" className={styles.genderLogo} alt="female" />
                                <label>Female</label>
                              </div>
                            </div>
                          </> :
                          <> 
                            <Link 
                              to="#"
                              className={styles.nameInputLink} 
                              onClick={() => {this.setState({ 
                                gender: {
                                  ...gender, 
                                  showInputBox: true
                                } 
                              })
                              console.log(this.state.gender)}
                            }
                            >
                              Add Gender
                            </Link>
                          </>
                        }
                      </div>
                    </>
                  }
                </div>
                <button 
                  onClick={this.userProfileInfoSubmitButton} 
                  className={this.isBioFormFilled() ? styles.submitButtonEnabled : styles.submitButtonDisabled}
                  {
                    ...this.isBioFormFilled() ?
                    null : 
                    { disabled: 'disabled' }
                  }
                >
                  {
                    submitDataLoading ?
                    <span className={styles.loadingSpan}>
                      <ReactLoading type="bubbles" color="#fff" />
                    </span> :
                    <span>Save</span>
                  }
                </button>
              </div>
            </> : 
            <span></span>
          }
        </div>
        <div>
          {
            showUserContactInformationModal ? 
            <>
              <div className={styles.modalOverlay}></div>
              <div className={styles.modalBox}>
                <X
                  size={24}
                  onClick={() => this.setState({
                    showUserContactInformationModal: false,
                    email: {
                      ...email
                    }, 
                    phoneNumber: {
                      ...phoneNumber 
                    }
                  })}
                  className={styles.closeButton}
                />
                <h2 className={styles.modalBoxTitle}>Ubah Data Kontak</h2>
                <p className={styles.modalBoxSubtitle}>Pastikan Email dan Nomor HP yang Anda cantumkan merupakan kontak yang sedang aktif</p>
                <div className={styles.modalBoxFormWrapper}>
                  <label className={styles.nameLabel}>Email</label>
                  <div className={styles.formInputWrapper}>
                    <div className={email.inputFocused ? styles.inputWrapperFocused : styles.inputWrapper}>
                      <input type="email" name="email" className={`${styles.inputBox} ${styles.globalStyling}`} value={email.value} onChange={this.nonBioHandleChange} onFocus={this.focusFunction}/>
                    </div>
                  </div>
                  <label className={styles.nameLabel}>No Telepon</label>
                  <div className={styles.formInputWrapper}>
                    <div className={phoneNumber.inputFocused ? styles.inputWrapperFocused : styles.inputWrapper}>
                      <input type="phoneNumber" name="phoneNumber" className={`${styles.inputBox} ${styles.globalStyling}`} value={phoneNumber.value} onChange={this.nonBioHandleChange} onFocus={this.focusFunction} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={this.userContactInfoSubmitButton}
                  className={this.isContactFormFilled() ? styles.submitButtonEnabled : styles.submitButtonDisabled}
                  {
                  ...this.isContactFormFilled() ?
                    null :
                    { disabled: 'disabled' }
                  }
                >
                  {
                    submitDataLoading ? 
                    <span className={styles.loadingSpan}>
                      <ReactLoading type="bubbles" color="#fff"/>
                    </span> :
                    <span>Save</span>
                  }
                </button>
              </div>
            </> : 
            <span></span>
          }
        </div>
        <div>
          {
            showUserAddressInformationModal ? 
            <>
              <div className={styles.modalOverlay}></div>
              <div className={styles.modalBox}>
                <X
                  size={24}
                  onClick={() => this.setState({
                    showUserAddressInformationModal: false,
                    address: {
                      ...address
                    }
                  })}
                  className={styles.closeButton}
                />
                <h2 className={styles.modalBoxTitle}>Ubah Alamat</h2>
                <p className={styles.modalBoxSubtitle}>Pastikan Alamat yang Anda cantumkan merupakan alamat Anda sebenarnya</p>
                <div className={styles.modalBoxFormWrapper}>
                  <label className={styles.nameLabel}>Alamat</label>
                  <div className={styles.formInputWrapper}>
                    <div className={address.inputFocused ? styles.inputWrapperFocused : styles.inputWrapper}>
                      <input name="address" className={`${styles.inputBox} ${styles.globalStyling}`} value={address.value} onChange={this.nonBioHandleChange} onFocus={this.focusFunction} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={this.userAddressInfoSubmitButton}
                    className={this.isAddressFormFilled() ? styles.submitButtonEnabled : styles.submitButtonDisabled}
                  {
                  ...this.isAddressFormFilled() ?
                    null :
                    { disabled: 'disabled' }
                  }
                >
                  {
                    submitAddressLoading ?
                      <span className={styles.loadingSpan}>
                        <ReactLoading type="bubbles" color="#fff" />
                      </span> :
                      <span>Save</span>
                  }
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

export default SettingsView;