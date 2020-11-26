package com.rgq.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class GameDTO {
    private ArrayList<String> battleField;
    private Integer x;
    private Integer y;
}
