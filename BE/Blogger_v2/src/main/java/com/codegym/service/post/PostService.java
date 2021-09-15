package com.codegym.service.post;

import com.codegym.model.Post;
import com.codegym.repository.IPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostService implements IPostService {
    @Autowired
    IPostRepository postRepository;

    @Override
    public Iterable<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Override
    public void remove(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public Iterable<Post> findAllByStatus() {
        return postRepository.findAllByStatus();
    }

    @Override
    public Iterable<Post> findAllByTitle(String title) {
        return postRepository.findAllByTitleContaining(title);
    }

    @Override
    public Iterable<Post> findAllByIdUser(Long id) {
        return postRepository.findAllByIdUser(id);
    }

    @Override
    public Iterable<Post> findAllByHashtagId(Long id) {
        return postRepository.findAllByHashtagId(id);
    }

    @Override
    public Iterable<Post> findTopByDate(Long top) {
        // top là litmit trong sql
        return postRepository.findTopByDate(top);
    }

    @Override
    public Iterable<Post> findByOtherUser(Long id) {
        return postRepository.findAllByIdUserOther(id);
    }

    @Override
    public Iterable<Post> findMyPostByTitle(Long id, String title) {
        return postRepository.findAllMyPostByTitle(id, title);
    }

    @Override
    public Iterable<Post> findMyPostByHashtag(Long userId, Long hashtagId) {
        return postRepository.findMyPostByHashtag(userId,hashtagId);
    }

    @Override
    public Iterable<Post> findAllByHashtagIdAndOrderByUsername(Long id) {
        return postRepository.findAllByHashtagIdAndOrderByUsername(id);
    }

    @Override
    public Iterable<Post> findAllByHashtagIdAndOrderByTitle(Long id) {
        return postRepository.findAllByHashtagIdAndOrderByTitle(id);
    }

    @Override
    public Iterable<Post> findByDate(String dateStart, String dateEnd) {
        return postRepository.findByDate(dateStart, dateEnd);
    }

    @Override
    public Iterable<Post> findAllByStatusOfAdmin() {
        return postRepository.findAllByStatusOfAdmin();
    }

    @Override
    public Iterable<Post> findAllByStatusLock() {
        return postRepository.findAllByStatusLock();
    }

    @Override
    public Iterable<Post> findTopCommentOfPost() {
        return postRepository.findTopCommentOfPost();
    }

//    @Override
//    public Iterable<Post> findByDateAndHashtag(String time, Long id) {
//        return postRepository.findByDateAndHashtag(time,id);
//    }

    @Override
    public Iterable<String> findTitleAuthor(Long id) {
        return postRepository.findTitleById(id);
    }

    @Override
    public Iterable<Post> findByAuthorTitle(Long id, String title) {
        return postRepository.findByAuthorTitle(id, title);
    }

}
