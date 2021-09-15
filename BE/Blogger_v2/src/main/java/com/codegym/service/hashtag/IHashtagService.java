package com.codegym.service.hashtag;
import com.codegym.model.*;
import com.codegym.service.*;
public interface IHashtagService extends IGeneralService<Hashtag>{
    Iterable<Hashtag> findTopHashtagByPost();

}
