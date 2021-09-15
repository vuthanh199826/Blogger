package com.codegym.service.role;
import com.codegym.model.*;
import com.codegym.service.*;

import java.util.Optional;

public interface IRoleService extends IGeneralService<Role>{
    Optional<Role> findByName(RoleName roleName);

}
