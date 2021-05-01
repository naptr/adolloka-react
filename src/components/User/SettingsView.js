import React from 'react';
// import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link } from 'react-router-dom';
import styles from '../../styles/User/User.module.css';
import { X } from 'react-bootstrap-icons';

const LoadingView = (props) => {
  const { width, height } = props;
  
  return (
    <>
      <Skeleton width={width} height={height}/>
    </>
  )
  // return null
}

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


class SettingsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserData: null,
      uploadedPhoto: null,
      isLoading: true,
      uploadLoading: false, 
      showUserInformationModal: true,
      name: {
        value: '', 
        bool: false, 
        showInputBox: false
      },
      birthdate: {
        value: '', 
        bool: false, 
        showInputBox: false
      },
      gender: {
        value: '', 
        bool: false, 
        showInputBox: false
      }
    }

    // this.size = React.createRef();
  }

  // Fetching data method
  getUserData = () => {
    const { token } = this.props;

    // this.setState(
      // { isLoading: true }, 
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
            currentUserData: data
          })

          if (data.user.profile === null) {
            this.setState({ isLoading: false })
            return null
          } else if (data.profile) {
            if (data.profile.tgl_lahir === null) {
              this.setState({
                name: {
                  value: '', 
                  bool: false
                },
                birthdate: {
                  value: '', 
                  bool: false
                }, 
                gender: {
                  value: '', 
                  bool: false
                },
                isLoading: false
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
                isLoading: false
              })
            }
          } else {
            this.setState({ isLoading: false })
            return null
          }
        }
        console.log(this.state.currentUserData)
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
          'http://adolloka.herokuapp.com/api/foto/profile/update',
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
          alert('updating data success')
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

  handleChange = (ev) => {
    const field = ev.target.name;
    this.setState({ 
      [field]: {
        ...[field], 
        value: ev.target.value, 
        showInputBox: true
      }
    })
  }

  isFilled = () => {
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

  componentDidMount() {
    this.getUserData();
  }

  render() {
    const { 
      uploadedPhoto, 
      currentUserData, 
      isLoading, 
      uploadLoading, 
      showUserInformationModal,
      name, 
      birthdate, 
      gender
    } = this.state;

    return (
      <>
        {
          isLoading ? 
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
                  <Link className={styles.userInformationChangeLink} onClick={() => this.setState({showUserInformationModal: true})}>Change</Link>
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
                  <Link className={styles.userInformationChangeLink}>Change</Link>
                </div>
                <div className={styles.userInformationNameWrapper}>
                  <span className={styles.userInformationTitle}>Email</span>
                  <span className={styles.userInformationContent}>{currentUserData === null ? null : currentUserData.user.email}</span>
                </div>
                <div className={styles.userInformationNameWrapper}>
                  <span className={styles.userInformationTitle}>Nomor Telepon</span>
                  <span className={styles.userInformationContent}>{currentUserData === null ? null : phoneFormatter(currentUserData.user.no_hp)}</span>
                </div>
              </div>
            </>
          }
          </>
        }
        <div>
          {
            showUserInformationModal ? 
            <>
              <div className={styles.modalOverlay}></div>
              <div className={styles.modalBox}>
                <X 
                  size={24} 
                  onClick={() => this.setState({ 
                    showUserInformationModal: false, 
                    name: {
                      ...name,
                      showInputBox: false
                    }, 
                    birthdate: {
                      ...birthdate,
                      showInputBox: false
                    }, 
                    gender: {
                      ...gender,
                      showInputBox: false
                    }
                  })} 
                  className={styles.closeButton} 
                />
                <h2 className={styles.modalBoxTitle}>Ubah Biodata Diri</h2>
                <p className={styles.modalBoxSubtitle}>Data yang ada dalam Biodata ini bersifat penting.<br/>Pastikan biodata dirimu sudah terisi dengan benar.</p>
                <div className={styles.modalBoxFormWrapper}>
                  {
                    name.bool ?
                    <>
                      <label className={styles.nameLabel}>Name</label>
                      <div className={styles.formInputWrapper}>
                        <div className={styles.inputWrapper}>
                          <input disabled name="name" className={`${styles.inputBox} ${styles.globalStyling}`} value={genderFormatter(name.value)} />
                        </div>
                      </div>
                    </> :
                    <>
                      <div className={styles.formInputWrapper}>
                        {name.showInputBox ?
                          <>
                            <label className={styles.nameLabel}>Name</label>
                            <div className={styles.inputWrapper}>
                              <input name="name" className={`${styles.inputBox} ${styles.globalStyling}`} onChange={this.handleChange} value={name.value} />
                            </div>
                          </> :
                          <>
                            <Link
                              className={styles.nameInputLink}
                              onClick={() => this.setState({
                                name: {
                                  ...name,
                                  showInputBox: true
                                }
                              })}
                            >
                              Add Gender
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
                            <input disabled name="birthdate" className={`${styles.inputBox} ${styles.globalStyling}`} value={genderFormatter(birthdate.value)} />
                          </div>
                      </div>
                    </> :
                    <>
                      <div className={styles.formInputWrapper}>
                          {birthdate.showInputBox ?
                            <>
                              <label className={styles.nameLabel}>Birthdate</label>
                              <div className={styles.inputWrapper}>
                                <input name="birthdate" className={`${styles.inputBox} ${styles.globalStyling}`} onChange={this.handleChange} value={birthdate.value} />
                              </div>
                            </> :
                            <> 
                            <Link 
                            className={styles.nameInputLink} 
                            onClick={() => this.setState({ 
                              birthdate: {
                                ...birthdate, 
                                showInputBox: true
                              } 
                            })}
                            >
                              Add Birthdate
                          </Link></>}
                      </div>
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

                                </div>
                                <img src="/assets/male.svg" className={styles.genderLogo} alt="male" />
                                <label>Male</label>
                              </div>
                              <div className={styles.genderFormWrapper}>
                                <div className={styles.radioButtonWrapper}>
                                  <label className={styles.radioButtonWrapper}>
                                    <input type="radio" className={styles.radioButtonInput} />
                                    <span className={styles.radioButtonSpan}></span>
                                  </label>
                                </div>
                                <img src="/assets/female.svg" className={styles.genderLogo} alt="female" />
                                <label>Female</label>
                              </div>
                            </div>
                          </> :
                          <> 
                            <Link 
                            className={styles.nameInputLink} 
                            onClick={() => this.setState({ 
                              gender: {
                                ...gender, 
                                showInputBox: true
                              } 
                            })}
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
                  onClick={this.userInfoSubmitButton} 
                  className={this.isFilled() ? styles.submitButtonEnabled : styles.submitButtonDisabled}
                  {
                    ...this.isFilled() ? 
                    null : 
                    { disabled: 'disabled' }
                  }
                >
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

export default SettingsView;