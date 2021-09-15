package com.codegym.repository;

import com.codegym.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ILikeRepository extends JpaRepository<Like, Long> {


    @Query("select l from Like l where l.user.id =:idUser and l.post.id =:idPost")
    Optional<Like> findByIdUserAndIdPost(Long idUser, Long idPost);

    @Query(value = " select *  from likes group by post_id order by count(post_id)desc ; ", nativeQuery = true)
    Iterable<Like> findtop();

    @Query("select p from Like p where p.post.id =:idPost")
    List<Like> findByIdPost(Long idPost);

    @Query(value = " select *  from likes group by post_id order by count(post_id)desc limit 5 ; ", nativeQuery = true)
    Iterable<Like> findTop5();

}
