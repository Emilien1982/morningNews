import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Card, Icon, Modal} from 'antd';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const { Meta } = Card;

// REVOIR LA MISE EN PAGE POUR ARTICLES DE GOOGLE NEWS

function ScreenArticlesBySource() {
  const dispatch = useDispatch();
  const { sourceId } = useParams();
  //console.log('ID: ', sourceId);

  const [articleList, setArticleList] = useState([]);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalImgSrc, setModalImgSrc] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  
  
  useEffect(() => {
    const loadArticles = async () => {
      const response = await fetch(`https://newsapi.org/v2/everything?sources=${sourceId}&pageSize=10&apiKey=00eb781fbc674c2185c39fc309988ef3`);
      const { articles } = await response.json();
      setArticleList(articles);
    }
    loadArticles();
  }, [sourceId]);

  //console.log('ARTICLES: ', articleList);

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const userToken = useSelector((state) => state.user);
  //console.log('Token in artBySou: ', userToken);

  const language = useSelector(state => state.language);

  return (
    <div>
      <Nav/>
      <div className="Banner"></div>
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
            dataSource={articleList}
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
                          <Icon type="like" key="ellipsis" onClick={() => {dispatch({type: 'addArticle', article: { title, description, content, urlToImage, language }, userToken})}}/>
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


export default ScreenArticlesBySource;