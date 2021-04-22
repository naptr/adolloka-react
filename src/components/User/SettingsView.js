import React from 'react';
// import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import styles from '../../styles/User/User.module.css';

const LoadingView = (props) => {
  const { width, height } = props;

  return (
    <>
      <Skeleton width={width} height={height}/>
    </>
  )
  // return null
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

class SettingsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserData: null,
      uploadedPhoto: null,
      isLoading: true
    }

    this.size = React.createRef();
  }

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
        }
        this.setState({ 
          currentUserData: data,
          isLoading: false 
        })
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
      {isLoading: false}, 
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
            alert('success updating data');
          }
        })
        .catch(err => console.log(err))
      }
      )
    }
    
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

  componentDidUpdate() {
    // console.log(this.state.uploadedPhoto);
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    const { uploadedPhoto, currentUserData } = this.state;
    // if (this.state.isLoading) {
    //   return (
    //     <LoadingView />
    //   )
    // } else {
    //   return (
    //     <>
    //       <div className={styles.settingsViewContainer}>
    //         <section className={styles.photoUploadSection}>
    //           <picture className={styles.photoWrapper}>
    //             {/* <img src={currentUserData.profile.foto} alt="profile" className={styles.photoFrame}/> */}
    //           </picture>
    //         </section>
    //       </div>
    //     </>
    //   )
    // }
    return (
      <>
        <div className={styles.settingsViewPhotoSection}>
            {
              this.state.isLoading ? 
              <>
                <LoadingView width={290} height={290} />
                <div style={{marginTop: 16+'px'}}></div>
                <LoadingView width={290} height={40} />
              </> : 
              <>
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
              </>
            }
        </div>
        <div className={styles.settingsViewInformationSection}>
          <div className={styles.userInformationMainTitleWrapper}>
            <p className={styles.userInformationMainTitle}>Ubah Biodata Diri</p>
            <Link className={styles.userInformationChangeLink}>Change</Link>
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
            <span className={styles.userInformationContent}>{currentUserData === null ? null : (currentUserData.user.profile === null ? null : (currentUserData.profile.gender === null ? null : currentUserData.profile.gender))}</span>
          </div>
        </div>
      </>
    )
  }
}

export default SettingsView;