package com.codegym.controller;

import com.codegym.model.Like;
import com.codegym.model.Post;
import com.codegym.service.like.ILikeService;
import com.codegym.service.like.LikeService;
import com.codegym.service.post.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/likes")
public class LikeController {
    @Autowired
    private ILikeService likeService;
    @Autowired
    private IPostService postService;

    @GetMapping()
    public ResponseEntity<Iterable<Like>> findAll() {
        return new ResponseEntity<>(likeService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/create/{id}")
    public ResponseEntity<?> create(@RequestBody Like like, @PathVariable Long id) {
        Optional<Post> postOptional = postService.findById(id);
        if (!postOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (likeService.findByUser(like.getUser().getId(), like.getPost().getId()) == false) {
            likeService.remove(likeService.findByIdUserAndIdPost(like.getUser().getId(), like.getPost().getId()).get().getId());
            postOptional.get().setCount(postOptional.get().getCount() - 1);
            postService.save(postOptional.get());
            return new ResponseEntity<>(HttpStatus.FAILED_DEPENDENCY);
        } else {
            likeService.save(like);
            postOptional.get().setCount(postOptional.get().getCount() + 1);
            postService.save(postOptional.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Like> delete(@PathVariable Long id) {
        likeService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search/{idUser}/{idPost}")

    public ResponseEntity<Like> findByUserIdAndIdPost(@PathVariable Long idUser, @PathVariable Long idPost) {

        return new ResponseEntity<>(likeService.findByIdUserAndIdPost(idUser, idPost).get(), HttpStatus.OK);

    }

    @GetMapping("/search/top")
    public ResponseEntity<Iterable<Like>> findTop() {
        return new ResponseEntity<>(likeService.findtop(), HttpStatus.OK);
    }

    @GetMapping("/search/{idPost}")
    public ResponseEntity<Iterable<Like>> findByIdPost(@PathVariable Long idPost) {
        return new ResponseEntity<>(likeService.findByIdPost(idPost), HttpStatus.OK);
    }

    @GetMapping("/search/top5")
    public ResponseEntity<Iterable<Like>> findTop5() {
        return new ResponseEntity<>(likeService.findTop5(), HttpStatus.OK);
    }

}

