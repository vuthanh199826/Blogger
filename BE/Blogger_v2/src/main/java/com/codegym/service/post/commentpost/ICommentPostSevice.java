package com.codegym.service.post.commentpost;

import com.codegym.model.CommentPost;
import com.codegym.model.Post;
import com.codegym.service.IGeneralService;

import java.util.Optional;

public interface ICommentPostSevice extends IGeneralService<CommentPost> {
    Iterable<CommentPost> getAllCommentByPost(Post post);
}
