import React, { useState } from 'react';
import './App.css';
import { List, Card, Icon, Modal} from 'antd';
import Nav from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import LANGUAGES from './utilities/supportedLanguages';



const { Meta } = Card;

function ScreenMyArticles() {
  const dispatch = useDispatch();

  const [modalTitle, setModalTitle] = useState(null);
  const [modalImgSrc, setModalImgSrc] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const showModal = (title, content, urlToImage) => {
    setModalTitle(title);
    setModalContent(content);
    setModalImgSrc(urlToImage);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const userToken = useSelector(state => state.user)

  //console.log('myArticles: ', useSelector(state => state.articles));

  const handleClickFlag = async (language) => {
    console.log('Language to filter: ', language);
    setSelectedLanguage(language);

    // RESTE A GERER LE FILTRAGE DES ARTICLES DE LA WISHLIST EN FONCTION DE LA LANGUE

   /*  fetch(`/change-language/${user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `language=${language}`
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
    .then(() => setSelectedLanguage(language))
    ; */
  }

  const languageFlags = LANGUAGES.map(language => {
    let classes = 'language_flags';
    if (selectedLanguage === language){
      classes += ' selected_language';
    }
    return <img
      key={`flag-${language}`}
      className={classes}
      src={`../images/${language}.png`} 
      alt={`language-${language}`}
      onClick={() => handleClickFlag(language)}
    />
  })

  return (
    <div>
            <Nav/>

            <div className="Banner">
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
                {languageFlags}
              </div>
            </div>

            {useSelector(state => state.articles).length === 0 && <h2 className='no-articles'>No Articles</h2>}   {/* Demandé en bonus mais déjà géré par le composant List de ant-Design */}

            <div className="site-card-wrapper">
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
                }}
                dataSource={useSelector(state => state.articles)}
                renderItem={({title, description, content, urlToImage}) => (
                  <List.Item>
                    <div className="Card">
                      <div  style={{display:'flex',justifyContent:'center'}}>
                        <Card
                          style={{ 
                          width: 300, 
                          height: '28rem',
                          margin:'15px', 
                          display:'flex',
                          flexDirection: 'column',
                          justifyContent:'space-between' }}
                          cover={
                          <img
                              alt={title}
                              src={urlToImage? urlToImage : '../images/default_image.png'}
                          />
                          }
                          actions={[
                              <Icon type="read" key="ellipsis2" onClick={() => showModal(title, content, urlToImage)} />,
                              <Icon type="delete" key="ellipsis" onClick={() => dispatch({ type: 'deleteArticle', title: title, userToken })} />
                          ]}
                          >
                          <Meta
                            title={title}
                            description={description}
                          />
                        </Card>
                      </div>
                    </div> 
                  </List.Item>
                )}
              />
              <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <article>
                  <img
                      alt={modalTitle}
                      src={modalImgSrc}
                      style={{width: '100%'}}
                  />
                  <p>{modalContent}</p>
                </article>
              </Modal>
            </div>

      </div>
  );
}


export default ScreenMyArticles;
