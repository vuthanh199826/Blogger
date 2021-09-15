package com.codegym.controller;


import com.codegym.message.request.CommentPostCreate;
import com.codegym.message.response.ResponseMessage;
import com.codegym.model.CommentPost;
import com.codegym.model.Post;
import com.codegym.model.User;
import com.codegym.security.service.UserDetailsServiceImpl;
import com.codegym.service.post.PostService;
import com.codegym.service.post.commentpost.CommentPostService;
import com.codegym.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/comment")
public class CommentPostController {
@Autowired
    PostService postService;
@Autowired
    CommentPostService commentPostService;
@Autowired
UserDetailsServiceImpl userDetailsService;
@Autowired
    UserService userService;
    // lay list comment theo id bai post
@GetMapping("/{id}")
public ResponseEntity<?> getListCommentByIdPost(@PathVariable Long id){
    //Lấy user hiện tại ra
//    User user = userService.findById(Long.valueOf(Post.getId())).get();
    //get list post ra
    Optional<Post> post = postService.findById(id);
    List listcomment = (List) commentPostService.getAllCommentByPost(post.get());
    if(listcomment.isEmpty()) return new ResponseEntity<>(new ResponseMessage("khong co bai post"), HttpStatus.NOT_FOUND);
    return new ResponseEntity<>(listcomment,HttpStatus.OK);
}
    @PostMapping("/create/{id}")
    public ResponseEntity<?> createComment(@PathVariable("id") Long id, @RequestBody CommentPostCreate commentPostCreate){
        // lay user hien tai
        User user = userService.findById(Long.valueOf(commentPostCreate.getId())).get();
        // kiem tra xem id bai post co ton tai hay khong
        Optional<Post> post = postService.findById(id);
        if(!post.isPresent())
            return new ResponseEntity<>(new ResponseMessage("khong tim thay bai post"),HttpStatus.NOT_FOUND);
        // neu tim thay thi :
        // tao comment post
        CommentPost commentPost = CommentPost.build(commentPostCreate);
        commentPost.setUser(user);
        commentPost.setPost(post.get());
        commentPostService.save(commentPost);
        post.get().setComment_count(post.get().getComment_count()+1);
        postService.save(post.get());
        // tang count

        return new ResponseEntity<>(new ResponseMessage("create comment done"), HttpStatus.OK);
    }
    // sua comment bai viet theo id cua comment nha
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateComment(@PathVariable("id") Long id, @RequestBody CommentPostCreate commentPostCreate){
        // lay user hien tai
//        User user = userDetailsService.getCurrentUser();
        User user = userService.findById(Long.valueOf(commentPostCreate.getId())).get();
        // kiem tra comment co ton tai hay khong

        Optional<CommentPost> commentPost = commentPostService.findById(id);
        if(!commentPost.isPresent())
            return new ResponseEntity<>(new ResponseMessage("khong tim thay comment "),HttpStatus.NOT_FOUND);
        // kiem tra xem co ton tai bai post k ?
        Optional<Post> post = postService.findById(commentPost.get().getPost().getId());
        if(!post.isPresent())
            return new ResponseEntity<>(new ResponseMessage("khong tim thay bai post"),HttpStatus.NOT_FOUND);
        // kiem tra xem user hien tai co phai chu comment hay khong

        if(user.getUsername().equals(commentPost.get().getUser().getUsername())){
            // dung roi thi sua
            commentPost.get().setText(commentPostCreate.getText());
            commentPostService.save(commentPost.get());
            return new ResponseEntity<>(new ResponseMessage("update comment done"),HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResponseMessage("khong co quyen sua"),HttpStatus.FORBIDDEN);
    }// Xóa comment theo user comment hoac chu bai post
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable("id") Long id) {
//        User user =userDetailsService.getCurrentUser();
        Optional<CommentPost> commentPost = commentPostService.findById(id);
        if(!commentPost.isPresent())
            return new ResponseEntity<>(new ResponseMessage("khong tim thay comment "),HttpStatus.NOT_FOUND);
        Optional<Post> post = postService.findById(commentPost.get().getPost().getId());
        if(!post.isPresent())
            return new ResponseEntity<>(new ResponseMessage("khong tim thay bai post"),HttpStatus.NOT_FOUND);

//        if( user.getUsername().equals(commentPost.get().getUser().getUsername())){
            // dung roi thi xoa
            commentPostService.remove(id);

            if(post.get().getComment_count() > 0)
                post.get().setComment_count(post.get().getComment_count() - 1);
            else
                post.get().setComment_count(0);
            postService.save(post.get());
            return new ResponseEntity<>(new ResponseMessage("delete comment done"),HttpStatus.OK);
//        }

//        return new ResponseEntity<>(new ResponseMessage("khong co quyen xoa"),HttpStatus.FORBIDDEN);
    }
}