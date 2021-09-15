package com.codegym.service.post.commentpost;

import com.codegym.model.CommentPost;
import com.codegym.model.Post;
import com.codegym.repository.ICommentPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class CommentPostService implements ICommentPostSevice{
    @Autowired
    ICommentPostRepository commentPostRepository;
    @Override
    public Iterable<CommentPost> findAll() {
        return commentPostRepository.findAll();
    }

    @Override
    public Optional<CommentPost> findById(Long id) {
        return commentPostRepository.findById(id);
    }

    @Override
    public CommentPost save(CommentPost commentPost) {
        return commentPostRepository.save(commentPost);
    }

    @Override
    public void remove(Long id) {
commentPostRepository.deleteById(id);
    }
    @Override
    public Iterable<CommentPost> getAllCommentByPost(Post post) {
        return   commentPostRepository.findAllByPost(post);
    }
}
