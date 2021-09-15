package com.codegym.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.codegym.model.*;
import com.codegym.service.hashtag.*;
import com.codegym.repository.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/hashtags")
public class HashtagController {
    @Autowired
    private HashtagService hashtagService;

    @GetMapping()
    public ResponseEntity<Iterable<Hashtag>> findAll() {
        Iterable<Hashtag> hashtags = hashtagService.findAll();
        return new ResponseEntity<>(hashtags, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Hashtag>> findById(@PathVariable Long id) {
        Optional<Hashtag> hashtag = hashtagService.findById(id);
        return new ResponseEntity<>(hashtag, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Hashtag> create(@RequestBody Hashtag hashtag) {
        hashtagService.save(hashtag);
        return new ResponseEntity<>(hashtag, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hashtag> edit(@PathVariable Long id, @RequestBody Hashtag hashtag) {
        Optional<Hashtag> currentHashtag = hashtagService.findById(id);
        if (!currentHashtag.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        hashtag.setId(id);
        hashtagService.save(hashtag);
        return new ResponseEntity<>(hashtag, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Hashtag>> delete(@PathVariable Long id) {
        Optional<Hashtag> hashtag = hashtagService.findById(id);
        if (!hashtag.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        hashtagService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/top")
    public ResponseEntity<Iterable<Hashtag>> getTop(){
        Iterable<Hashtag> hashtags = hashtagService.findTopHashtagByPost();
        return new ResponseEntity<>(hashtags,HttpStatus.OK);
    }

}
