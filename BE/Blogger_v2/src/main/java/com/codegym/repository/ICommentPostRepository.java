package com.codegym.repository;

import com.codegym.model.CommentPost;
import com.codegym.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ICommentPostRepository extends JpaRepository<CommentPost,Long> {

    Iterable<CommentPost> findAllByPost(Post post);
}
