package com.codegym.repository;

import com.codegym.model.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPostRepository extends PagingAndSortingRepository<Post, Long> {

    @Query("select p from Post p where p.status = 'public' order by p.date desc")
    Iterable<Post>findAllByStatus();

    @Query("select p from Post p where p.status = 'lock' order by p.date desc")
    Iterable<Post>findAllByStatusLock();

    @Query("select p from Post p where p.status = 'public' or p.status = 'lock' order by p.date desc")
    Iterable<Post>findAllByStatusOfAdmin();

    Iterable<Post>findAllByTitleContaining(String title);

    @Query(value = "select * from post where post.user_id =:id and post.title like  :title order by post.date desc ", nativeQuery = true)
    Iterable<Post>findAllMyPostByTitle(Long id,String title);

    @Query("select p from Post p where p.user.id =:id order by p.date desc ")
    Iterable<Post>findAllByIdUser(Long id);

    @Query("select p from Post p where p.user.id =:id  and  p.status = 'public' order by p.date desc")
    Iterable<Post>findAllByIdUserOther(Long id);

    @Query("select p from Post p where p.hashtag.id =:id  and  p.status = 'public' order by p.date desc ")
    Iterable<Post>findAllByHashtagId(Long id);

    @Query(value = "select * from post order by post.date desc limit :top" , nativeQuery = true)
    Iterable<Post>findTopByDate(Long top);

    @Query("select p from Post p where p.user.id =:userId and p.hashtag.id =:hashtagId order by p.date desc")
    Iterable<Post>findMyPostByHashtag(Long userId, Long hashtagId);

    @Query("select p from Post p where p.hashtag.id =:id  and  p.status = 'public' order by p.title desc ")
    Iterable<Post>findAllByHashtagIdAndOrderByTitle(Long id);

    @Query("select p from Post p where p.hashtag.id =:id  and  p.status = 'public' order by p.user.username desc ")
    Iterable<Post>findAllByHashtagIdAndOrderByUsername(Long id);

    @Query(value = "select * from post where post.date between :timeStart and   :timeEnd and post.status = 'public' ", nativeQuery = true)
    Iterable<Post>findByDate(String timeStart, String timeEnd);

    @Query(value = "select title from post where user_id =:userId", nativeQuery = true)
    Iterable<String>findTitleById(Long userId);

    @Query(value = "select * from post where user_id =:id and title like %:title% order by date desc ", nativeQuery = true)
    Iterable<Post> findByAuthorTitle(Long id, String title);

    @Query(value = "select * from post where post.status = 'public' and post.comment_count > 0 order by post.comment_count desc limit 5", nativeQuery = true)
    Iterable<Post>findTopCommentOfPost();

}
