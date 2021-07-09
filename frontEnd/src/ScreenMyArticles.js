import React, { useState } from 'react';
import './App.css';
import { List, Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [modalTitle, setModalTitle] = useState(null);
  const [modalImgSrc, setModalImgSrc] = useState(null);
  const [modalContent, setModalContent] = useState(null);
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

  //console.log('myArticles: ', props.myArticles);


  return (
    <div>
            <Nav/>

            <div className="Banner"/>

            {props.myArticles.length === 0 && <h2 className='no-articles'>No Articles</h2>}   {/* Demandé en bonus mais déjà géré par le composant List de ant-Design */}

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
                dataSource={props.myArticles}
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
                              <Icon type="delete" key="ellipsis" onClick={() => props.deleteToWishlist(title)} />
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

const mapStateToProps = (state) => {
  //console.log('STATE: ', state);
  return {myArticles: state.articles};
}

const mapDispatchToProps = (dispatch) => {
  return{
    deleteToWishlist: (title) => {
      dispatch({
        type: 'deleteArticle',
        title: title
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);
