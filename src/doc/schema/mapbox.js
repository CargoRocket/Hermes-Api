/**
  @swagger
 * "components": {
 *  "schemas": {
 *    "MAPBOX_DIRECTION_RESPONSE": {
        "type": "object",
        "properties": {
          "routes": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MAPBOX_DIRECTION_ROUTE"
            }
          },
          "waypoints": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MAPBOX_WAYPOINT"
            }
          },
          "code": {
            "type": "string",
            "enum": [
              "Ok"
            ],
            "description": "Indicates the current status of the job",
            "example": "Ok"
          },
          "uuid": {
            "type": "string",
            "format": "uuid",
            "example": "6yhB_Xar8PiRa6Vki_7gXHm1V34rIX5CU2plRediLiBCkDqgVmFLhA=="
          }
        }
      },
      "MAPBOX_MANEUVER": {
        "bearing_after": {
           "type": "integer",
           "example": 16
         },
         "bearing_before": {
           "type": "integer",
           "example": 16
         },
         "location": {
           "type": "array",
           "items": {
             "type": "float"
           },            
           "minItems": 2,
           "maxItems": 2
         },
         "type": {
           "type": "string",
           "example": "depart"
         },
         "instruction": {
           "type": "string",
           "example": "Head north"
         }
      },
      "MAPBOX_INTERSECTION": {
        "out": {
           "type": "float",
           "example": 0
         },
         "entry": {
           "type": "array",
           "items": {
             "type": "boolean"
           },            
           "minItems": 1
         },
         "bearing": {
           "type": "array",
           "items": {
             "type": "integer"
           },
           "minItems": 1
         },
         "location": {
           "type": "array",
           "items": {
             "type": "float"
           },            
           "minItems": 2,
           "maxItems": 2
         }
      },
      "MAPBOX_WAYPOINT": {
        "distance": {
           "type": "float",
           "example": 3596.8746083669384
         },
         "name": {
           "type": "string"
         },
         "location": {
           "type": "array",
           "items": {
             "type": "float"
           },            
           "minItems": 2,
           "maxItems": 2
         }
      },
      "MAPBOX_STEP": {
        "intersections": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/MAPBOX_INTERSECTION"
          }
        },
        "driving_side": {
          "type": "string",
          "example": "right"
        },
        "geometry": {
          "type": "string",
          "example": "ktvnPep_b|AoPeDkPqJsI_PkVuAsNqKwHmCy^wIuY{LkO~BiIQyFgFqPNoQyIeRiFqAiG_C}GkG{HeQeSgU}Tib@{\\qLoUiQcK_\\oEuC{CsMwE_MgE}PwV_AuQcF_P}JEy[}BkV}A{RwA}JdIuRhGyAfV}F`O_UtI"
        },
        "mode": {
          "type": "string",
          "example": "cycling"
        },
        "maneuver": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/MAPBOX_MANEUVER"
          }
        },
        "weight": {
          "type": "float",
          "example": 415.5
        },
        "duration": {
          "type": "float",
          "example": 415.5
        },
        "name": {
          "type": "string"
        },
        "distance": {
          "type": "float",
          "example": 1384.1
        }
      },
       "MAPBOX_LEG": {
         "summary": {
           "type": "string"
         },
         "weight": {
           "type": "float",
           "example": 415.5
         },
         "duration": {
           "type": "float",
           "example": 415.5
         },
         "steps": {
           "type": "array",
           "items": {
             "$ref": "#/components/schemas/MAPBOX_STEP"
           }
         },
         "distance": {
           "type": "float",
           "example": "1384.1"
         }
      },
       "MAPBOX_DIRECTION_ROUTE": {
        "geometry": {
           "type": "string",
           "example": "ktvnPep_b|AoPeDkPqJsI_PkVuAsNqKwHmCy^wIuY{LkO~BiIQyFgFqPNoQyIeRiFqAiG_C}GkG{HeQeSgU}Tib@{\\qLoUiQcK_\\oEuC{CsMwE_MgE}PwV_AuQcF_P}JEy[}BkV}A{RwA}JdIuRhGyAfV}F`O_UtI"
         },
         "legs": {
           "type": "array",
           "items": {
             "$ref": "#/components/schemas/MAPBOX_LEG"
           }
         },
         "weight_name": {
           "type": "string",
           "example": "cyclability"
         },
         "weight": {
           "type": "float",
           "example": 415.5
         },
         "duration": {
           "type": "float",
           "example": 415.5
         },
         "distance": {
           "type": "float",
           "example": 1384.1
         }
      }
    }
  }
*/