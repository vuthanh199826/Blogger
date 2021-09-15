package com.codegym.repository;
import com.codegym.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IHashtagRepository extends JpaRepository<Hashtag, Long> {
    @Query(value = "select * from hashtag join post on hashtag.id = post.hashtag_id where post.status = 'public' group by hashtag.id order by count(post.id) desc limit 5",nativeQuery = true)
    Iterable<Hashtag> findTopHashtagByPost();
}
