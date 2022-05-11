package com.timesheet.Timesheet.web.mapper;

import com.timesheet.Timesheet.domain.AbstractModel;
import com.timesheet.Timesheet.web.dto.AbstractDTO;

public abstract class DefaultMapper<D extends AbstractDTO, E extends AbstractModel> {

    protected void toDTO(E model, D dto) {
        if (model==null || dto==null) {
            return;
        }
        dto.setId(model.getId());
        dto.setVersion(model.getVersion());
    }

    protected void toEntity(D dto,E model) {
        if (model==null || dto==null) {
            return;
        }
        if(dto.getDeleted() != null)
            model.setDeleted(dto.getDeleted());
        model.setId(dto.getId());
    }
}

