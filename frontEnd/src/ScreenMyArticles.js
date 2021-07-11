import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Card, Icon, Modal} from 'antd';
import Nav from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import LANGUAGES from './utilities/supportedLanguages';


// AU SIGN IN LES ARTICLES AFFICHE SONT CEUX DU PRECEDENT USER.

const { Meta } = Card;

function ScreenMyArticles() {
  const dispatch = useDispatch();

  const [modalTitle, setModalTitle] = useState(null);
  const [modalImgSrc, setModalImgSrc] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  let storedWishlist = useSelector(state => state.articles);;
  const [articleToDisplay, setArticleToDisplay] = useState([]);
  //console.log('ARTICLES: ', articleToDisplay);

  useEffect(()=>{
    setArticleToDisplay(storedWishlist);
  }, [])

  useEffect(() => {
    if (selectedLanguage !== 'all'){
      setArticleToDisplay( storedWishlist.filter(article => article.language === selectedLanguage) )
    }
  }, [selectedLanguage])

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
    //console.log('Language to filter: ', language);
    setSelectedLanguage(language);
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

  const handleDelete = (title) => {
    setArticleToDisplay(storedWishlist.filter(article => article.title !== title));
    dispatch({ type: 'deleteArticle', title: title, userToken });
  }

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
                dataSource={articleToDisplay}
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
                              <Icon type="delete" key="ellipsis" onClick={() => handleDelete(title)} />
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
