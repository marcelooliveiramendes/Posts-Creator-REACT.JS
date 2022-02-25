
import React from 'react';
import { Component } from 'react';
import './style.css';

import { Posts } from '../../components/Posts';
import {loadPosts} from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { InputText } from '../../components/InputText';

class Home extends Component{
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: '',
  }

  async componentDidMount(){
    await this.loadPosts();
  }

  loadPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
     });
  }

  loadMorePosts = () => {
    const {
      postsPerPage,
      posts,
      allPosts,
      page
    
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({posts, page: nextPage});
  }

  handleChange = (e) =>{
      const {value} = e.target;
      this.setState({searchValue: value});
  }

  render(){
    const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      
      );
    }) 
    
    : posts;
    
    return(
      <section className='container'>

          <div className='searchBox'>
            {!!searchValue && (
              <h1>Search value: {searchValue}</h1>
              
            )}
            <InputText handleChange={this.handleChange} value={searchValue}/>
          </div>
          
          
          
          {filteredPosts.length > 0 &&(
            <Posts posts={filteredPosts}/>

          )}
          
          {filteredPosts.length === 0 &&(
            <p>Não possui nenhum post com "{searchValue}"</p>

          )}

          <div className='button-container'>
            {!searchValue && (
              <Button 
              text='More Posts'
              onClick={this.loadMorePosts}
              disable= {noMorePosts}
              />
            )}
            
          </div>
          
      </section>
    )
  }
}

export default Home;
