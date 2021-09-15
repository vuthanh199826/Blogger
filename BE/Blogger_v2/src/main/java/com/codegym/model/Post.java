package com.codegym.model;

import com.codegym.service.like.LikeService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Thiếu title")
    private String title;
    private Date date;
    @NotEmpty(message = "Thiếu content")
    private String content;
    private String image;
    private String description;
    private String status;
    private Integer comment_count = 0;
    @NotNull
    @ManyToOne
    private User user;
    @NotNull
    @ManyToOne
    private Hashtag hashtag;
    private int count = 0;



    public Post() {
    }
    public Post(Long id, String title, Date date, String content, String image, String description, String status, User user, Hashtag hashtag,Integer comment_count) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.content = content;
        this.image = image;
        this.description = description;
        this.status = status;
        this.user = user;
        this.hashtag = hashtag;
        this.comment_count = 0;
    }

    public Post(String title, Date date, String content, String image, String description, String status, User user, Hashtag hashtag) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.image = image;
        this.description = description;
        this.status = status;
        this.user = user;
        this.hashtag = hashtag;
        this.comment_count = 0;
    }

    public Post(String title, Date date, String content, String image, String description, String status, User user) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.image = image;
        this.description = description;
        this.status = status;
        this.user = user;
        this.comment_count = 0;
    }

    public Post(Long id, String title, Date date, String content, String image, String description, String status, User user, Hashtag hashtag, int count) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.content = content;
        this.image = image;
        this.description = description;
        this.status = status;
        this.user = user;
        this.hashtag = hashtag;
        this.count = count;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getComment_count() {
        return comment_count;
    }

    public void setComment_count(Integer comment_count) {
        this.comment_count = comment_count;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Hashtag getHashtag() {
        return hashtag;
    }

    public void setHashtag(Hashtag hashtag) {
        this.hashtag = hashtag;
    }
}
