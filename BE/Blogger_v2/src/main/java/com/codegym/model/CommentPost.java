package com.codegym.model;

import com.codegym.message.request.CommentPostCreate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table
public class CommentPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String text;
    @ManyToOne(fetch = FetchType.EAGER)
    private Post post;
    private LocalDate createdDate;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    public CommentPost() {
    }

    public CommentPost(String text, LocalDate createdDate ) {
        this.text =text;
        this.createdDate = createdDate;
    }


    public Long getId() {
        return id;
    }

    public CommentPost(@NotEmpty String text, Post post, LocalDate createdDate) {
        this.text = text;
        this.post = post;
        this.createdDate = createdDate;
    }
    public static CommentPost build(CommentPostCreate postCreate ){
        return new CommentPost(
                postCreate.getText(),
                LocalDate.now()
        );
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
