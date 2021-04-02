/**
 * @swagger
 * "components": {
 *  "schemas": {
      "ClusterResponse": {
        "type": "object",
        "properties": {
          "copyrights": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "example": [
              "GraphHopper",
              "OpenStreetMap contributors"
            ]
          },
          "status": {
            "type": "string",
            "enum": [
              "waiting_in_queue",
              "processing",
              "finished"
            ],
            "description": "Indicates the current status of the job",
            "example": "finished"
          },
          "waiting_time_in_queue": {
            "type": "number",
            "format": "double"
          },
          "processing_time": {
            "type": "number",
            "format": "double",
            "example": 4900
          },
          "clusters": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Cluster"
            }
          }
        }
      },
      "Cluster": {
        "type": "object",
        "properties": {
          "quantity": {
            "type": "number",
            "format": "int32",
            "description": "Cluster size",
            "example": 40
          },
          "ids": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Array of customer ids assigned to this specific cluster",
            "example": [
              "GraphHopper GmbH"
            ]
          }
        }
      },
      "ClusterRequest": {
        "type": "object",
        "properties": {
          "configuration": {
            "$ref": "#/components/schemas/ClusterConfiguration"
          },
          "customers": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ClusterCustomer"
            }
          }
        }
      },
      "ClusterConfiguration": {
        "type": "object",
        "properties": {
          "response_type": {
            "type": "string",
            "description": "Specifies the response format. You can either choose `geojson` or `json`.",
            "default": "json",
            "example": "json"
          },
          "routing": {
            "$ref": "#/components/schemas/ClusterConfigurationRouting"
          },
          "clustering": {
            "$ref": "#/components/schemas/ClusterConfigurationClustering"
          }
        }
      },
      "ClusterCustomer": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "id of customer",
            "example": "GraphHopper GmbH"
          },
          "address": {
            "$ref": "#/components/schemas/ClusterCustomerAddress"
          },
          "quantity": {
            "type": "number",
            "format": "int32",
            "description": "demand of customer",
            "example": 10
          }
        }
      },
      "ClusterCustomerAddress": {
        "type": "object",
        "properties": {
          "lon": {
            "type": "number",
            "format": "double",
            "description": "Longitude",
            "example": 11.53941
          },
          "lat": {
            "type": "number",
            "format": "double",
            "description": "Latitude",
            "example": 48.118434
          },
          "street_hint": {
            "type": "string",
            "description": "Optional parameter. Specifies a hint for each address to better snap the coordinates (lon,lat) to road network. E.g. if there is an address or house with two or more neighboring streets you can control for which street the closest location is looked up.",
            "example": "Lindenschmitstraße 52"
          }
        }
      },
      "ClusterConfigurationRouting": {
        "type": "object",
        "properties": {
          "profile": {
            "type": "string",
            "description": "The routing profile for which the travel times and distances should be calculated. Other profiles are listed [here](#section/Map-Data-and-Routing-Profiles/OpenStreetMap)",
            "example": "car"
          },
          "cost_per_second": {
            "type": "number",
            "format": "double",
            "description": "Cost per second (travel time)",
            "example": 1
          },
          "cost_per_meter": {
            "type": "number",
            "format": "double",
            "description": "Cost per meter (travel distance)",
            "example": 0
          }
        }
      },
      "ClusterConfigurationClustering": {
        "type": "object",
        "properties": {
          "num_clusters": {
            "type": "number",
            "format": "int32",
            "description": "Specifies the number of clusters",
            "example": 10
          },
          "max_quantity": {
            "type": "number",
            "format": "int32",
            "description": "Specifies max. quantity in a cluster",
            "example": 50
          },
          "min_quantity": {
            "type": "number",
            "format": "int32",
            "description": "Specifies min. quantity in a cluster",
            "example": 30
          }
        }
      },
      "GeocodingResponse": {
        "properties": {
          "hits": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/GeocodingLocation"
            }
          },
          "took": {
            "type": "number",
            "format": "int64",
            "description": "in ms"
          }
        }
      },
      "GeocodingLocation": {
        "type": "object",
        "properties": {
          "point": {
            "$ref": "#/components/schemas/GeocodingPoint"
          },
          "osm_id": {
            "type": "string",
            "description": "The OSM ID of the entity"
          },
          "osm_type": {
            "type": "string",
            "description": "N = node, R = relation, W = way"
          },
          "osm_key": {
            "type": "string",
            "description": "The OSM key of the entity"
          },
          "name": {
            "type": "string",
            "description": "The name of the entity. Can be a boundary, POI, address, etc"
          },
          "country": {
            "type": "string",
            "description": "The country of the address"
          },
          "city": {
            "type": "string",
            "description": "The city of the address"
          },
          "state": {
            "type": "string",
            "description": "The state of the address"
          },
          "street": {
            "type": "string",
            "description": "The street of the address"
          },
          "housenumber": {
            "type": "string",
            "description": "The housenumber of the address"
          },
          "postcode": {
            "type": "string",
            "description": "The postcode of the address"
          }
        }
      },
      "GeocodingPoint": {
        "type": "object",
        "properties": {
          "lat": {
            "type": "number",
            "format": "double",
            "description": "Latitude"
          },
          "lng": {
            "type": "number",
            "format": "double",
            "description": "Longitude"
          }
        }
      },
      "MatrixRequest": {
        "type": "object",
        "properties": {
          "from_points": {
            "description": "The starting points for the routes in an array of `[longitude,latitude]`. For instance, if you want to calculate three routes from point A such as A->1, A->2, A->3 then you have one `from_point` parameter and three `to_point` parameters.",
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "double"
              }
            }
          },
          "to_points": {
            "description": "The destination points for the routes in an array of `[longitude,latitude]`.",
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "double"
              }
            }
          },
          "from_point_hints": {
            "description": "See `point_hints`of symmetrical matrix",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "to_point_hints": {
            "description": "See `point_hints`of symmetrical matrix",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "snap_preventions": {
            "description": "See `snap_preventions` of symmetrical matrix",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "from_curbsides": {
            "description": "See `curbsides`of symmetrical matrix",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "to_curbsides": {
            "description": "See `curbsides`of symmetrical matrix",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "out_arrays": {
            "description": "Specifies which matrices should be included in the response. Specify one or more of the following options `weights`, `times`, `distances`. The units of the entries of `distances` are meters, of `times` are seconds and of `weights` is arbitrary and it can differ for different vehicles or versions of this API.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "vehicle": {
            "allOf": [
              {
                "$ref": "#/components/schemas/VehicleProfileId"
              },
              {
                "description": "The vehicle profile for which the route should be calculated. Other vehicles are listed [here](#section/Map-Data-and-Routing-Profiles/OpenStreetMap) for the details."
              }
            ]
          },
          "fail_fast": {
            "description": "Specifies whether or not the matrix calculation should return with an error as soon as possible in case some points cannot be found or some points are not connected. If set to `false` the time/weight/distance matrix will be calculated for all valid points and contain the `null` value for all entries that could not be calculated. The `hint` field of the response will also contain additional information about what went wrong (see its documentation).",
            "type": "boolean",
            "default": true
          },
          "turn_costs": {
            "description": "Specifies if turn restrictions should be considered. Enabling this option increases the matrix computation time. Only supported for motor vehicles and OpenStreetMap.",
            "type": "boolean",
            "default": false
          }
        }
      },
      "SymmetricalMatrixRequest": {
        "type": "object",
        "properties": {
          "points": {
            "description": "Specify multiple points for which the weight-, route-, time- or distance-matrix should be calculated as follows: `[longitude,latitude]`. In this case the origins are identical to the destinations. Thus, if there are N points, NxN entries are calculated. The order of the point parameter is important. Specify at least three points. Cannot be used together with `from_point` or `to_point.`.",
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "double"
              }
            }
          },
          "point_hints": {
            "description": "Optional parameter. Specifies a hint for each point in the `points` array to prefer a certain street for the closest location lookup. E.g. if there is an address or house with two or more neighboring streets you can control for which street the closest location is looked up.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "snap_preventions": {
            "description": "Optional parameter to avoid snapping to a certain road class or road environment. Current supported values `motorway`, `trunk`, `ferry`, `tunnel`, `bridge` and `ford`",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "curbsides": {
            "description": "Optional parameter. It specifies on which side a point should be relative to the driver when she leaves/arrives at a start/target/via point. You need to specify this parameter for either none or all points. Only supported for motor vehicles and OpenStreetMap.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "out_arrays": {
            "description": "Specifies which matrices should be included in the response. Specify one or more of the following options `weights`, `times`, `distances`. The units of the entries of `distances` are meters, of `times` are seconds and of `weights` is arbitrary and it can differ for different vehicles or versions of this API.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "vehicle": {
            "allOf": [
              {
                "$ref": "#/components/schemas/VehicleProfileId"
              },
              {
                "description": "The vehicle profile for which the route should be calculated. Other vehicles are listed [here](#section/Map-Data-and-Routing-Profiles/OpenStreetMap) for the details."
              }
            ]
          },
          "fail_fast": {
            "description": "Specifies whether or not the matrix calculation should return with an error as soon as possible in case some points cannot be found or some points are not connected. If set to `false` the time/weight/distance matrix will be calculated for all valid points and contain the `null` value for all entries that could not be calculated. The `hint` field of the response will also contain additional information about what went wrong (see its documentation).",
            "type": "boolean",
            "default": true
          },
          "turn_costs": {
            "description": "Specifies if turn restrictions should be considered. Enabling this option increases the matrix computation time. Only supported for motor vehicles and OpenStreetMap.",
            "type": "boolean",
            "default": false
          }
        }
      },
      "MatrixResponse": {
        "type": "object",
        "properties": {
          "distances": {
            "description": "The distance matrix for the specified points in the same order as the time matrix. The distances are in meters. If `fail_fast=false` the matrix will contain `null` for connections that could not be found.",
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "int64"
              }
            }
          },
          "times": {
            "description": "The time matrix for the specified points in the order [[from1->to1, from1->to2, ...], [from2->to1, from2->to2, ...], ...]. The times are in seconds. If `fail_fast=false` the matrix will contain `null` for connections that could not be found.",
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "int64"
              }
            }
          },
          "weights": {
            "description": "The weight matrix for the specified points in the same order as the time matrix. The weights for different vehicles can have a different unit but the weights array is perfectly suited as input for Vehicle Routing Problems as it is currently faster to calculate. If `fail_fast=false` the matrix will contain `null` for connections that could not be found.",
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "double"
              }
            }
          },
          "info": {
            "$ref": "#/components/schemas/ResponseInfo"
          },
          "hints": {
            "description": "Optional. Additional response data",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "message": {
                  "description": "Short description of this hint",
                  "type": "string"
                },
                "details": {
                  "description": "Details of this hint",
                  "type": "string"
                },
                "invalid_from_points": {
                  "description": "Optional. An array of from_point indices of points that could not be found. Will only be added if `fail_fast=false` and some `from_point`s were not found.`",
                  "type": "array",
                  "items": {
                    "type": "number",
                    "format": "int32"
                  }
                },
                "invalid_to_points": {
                  "description": "Optional. An array of to_point indices of points that could not be found. Will only be added if `fail_fast=false` and some `to_point`s were not found.`",
                  "type": "array",
                  "items": {
                    "type": "number",
                    "format": "int32"
                  }
                },
                "point_pairs": {
                  "description": "Optional. An array of two-element arrays representing the from/to_point indices of points for which no connection could be found. Will only be added if `fail_fast=false` and some connections were not found.",
                  "type": "array",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "number",
                      "format": "int32"
                    }
                  }
                }
              }
            }
          }
        },
        "example": {
          "distances": [
            [
              0,
              97653,
              48887
            ],
            [
              97426,
              0,
              121035
            ],
            [
              49006,
              121049,
              0
            ]
          ],
          "times": [
            [
              0,
              4197,
              2994
            ],
            [
              4192,
              0,
              6074
            ],
            [
              3006,
              6062,
              0
            ]
          ],
          "weights": [
            [
              0,
              5662.551,
              3727.147
            ],
            [
              5653.807,
              0,
              7889.653
            ],
            [
              3741.528,
              7878.365,
              0
            ]
          ],
          "info": {
            "copyrights": [
              "GraphHopper",
              "OpenStreetMap contributors"
            ]
          }
        }
      },
      "RouteRequest": {
        "type": "object",
        "properties": {
          "points": {
            "description": "The points for the route in an array of `[longitude,latitude]`. For instance, if you want to calculate a route from point A to B to C\nthen you specify `points: [ [A_longitude, A_latitude], [B_longitude, B_latitude], [C_longitude, C_latitude]]\n",
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "double"
              }
            },
            "example": [
              [
                11.539421,
                48.118477
              ],
              [
                11.559023,
                48.12228
              ]
            ]
          },
          "point_hints": {
            "description": "Optional parameter. Specifies a hint for each point in the `points` array to prefer a certain street for the closest location lookup. E.g. if there is an address or house with two or more neighboring streets you can control for which street the closest location is looked up.",
            "type": "array",
            "items": {
              "type": "string"
            },
            "example": [
              "Lindenschmitstraße",
              "Thalkirchener Str."
            ]
          },
          "snap_preventions": {
            "description": "Optional parameter to avoid snapping to a certain road class or road environment. Current supported values `motorway`, `trunk`, `ferry`, `tunnel`, `bridge` and `ford`",
            "type": "array",
            "items": {
              "type": "string"
            },
            "example": [
              "motorway",
              "ferry",
              "tunnel"
            ]
          },
          "curbsides": {
            "description": "Optional parameter. It specifies on which side a point should be relative to the driver when she leaves/arrives at a start/target/via point. You need to specify this parameter for either none or all points. Only supported for motor vehicles and OpenStreetMap.",
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "any",
                "right",
                "left"
              ]
            },
            "example": [
              "any",
              "right"
            ]
          },
          "vehicle": {
            "allOf": [
              {
                "$ref": "#/components/schemas/VehicleProfileId"
              },
              {
                "description": "The vehicle profile for which the route should be calculated. Other vehicles are listed [here](#section/Map-Data-and-Routing-Profiles/OpenStreetMap) for the details."
              }
            ],
            "example": "bike"
          },
          "locale": {
            "description": "The locale of the resulting turn instructions. E.g. `pt_PT` for Portuguese or `de` for German.\n",
            "type": "string",
            "default": "en"
          },
          "elevation": {
            "type": "boolean",
            "description": "If `true`, a third coordinate, the altitude, is included with all positions in the response.\nThis changes the format of the `points` and `snapped_waypoints` fields of the response, in both their\nencodings. Unless you switch off the `points_encoded` parameter, you need special code on the\nclient side that can handle three-dimensional coordinates.\nA request can fail if the vehicle profile does not support elevation. See the features object for every vehicle profile.\n",
            "default": false
          },
          "details": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Optional parameter to retrieve path details. You can request additional details for the route: `street_name`,\n`time`, `distance`, `max_speed`, `toll`, `road_class`, `road_class_link`, `road_access`, `road_environment`, `lanes`, and `surface`. Read more about the usage of path details [here](https://discuss.graphhopper.com/t/2539).\n"
          },
          "optimize": {
            "type": "string",
            "default": "false",
            "description": "Normally, the calculated route will visit the points in the order you specified them.\nIf you have more than two points, you can set this parameter to `\"true\"` and the points may be re-ordered to minimize the total travel time.\nKeep in mind that the limits on the number of locations of the Route Optimization API applies, and the request costs more credits.\n"
          },
          "instructions": {
            "type": "boolean",
            "default": true,
            "description": "If instructions should be calculated and returned\n"
          },
          "calc_points": {
            "type": "boolean",
            "default": true,
            "description": "If the points for the route should be calculated at all.\n"
          },
          "debug": {
            "type": "boolean",
            "default": false,
            "description": "If `true`, the output will be formatted.\n"
          },
          "points_encoded": {
            "type": "boolean",
            "default": true,
            "description": "Allows changing the encoding of location data in the response. The default is polyline encoding, which is compact\nbut requires special client code to unpack. (We provide it in our JavaScript client library!)\nSet this parameter to `false` to switch the encoding to simple coordinate pairs like `[lon,lat]`, or `[lon,lat,elevation]`.\nSee the description of the response format for more information.\n"
          },
          "ch.disable": {
            "type": "boolean",
            "default": false,
            "description": "Use this parameter in combination with one or more parameters from below.\n"
          },
          "weighting": {
            "type": "string",
            "default": "fastest",
            "description": "Determines the way the ''best'' route is calculated. Default is `fastest`. Other options are `shortest` (e.g. for `vehicle=foot` or `bike`) and `short_fastest` which finds a reasonable balance between `shortest` and `fastest`. Requires `ch.disable=true`.\n"
          },
          "headings": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int32"
            },
            "description": "Favour a heading direction for a certain point. Specify either one heading for the start point or as many as there are points.\nIn this case headings are associated by their order to the specific points. Headings are given as north based clockwise angle between 0 and 360 degree.\nThis parameter also influences the tour generated with `algorithm=round_trip` and forces the initial direction.  Requires `ch.disable=true`.\n"
          },
          "heading_penalty": {
            "type": "integer",
            "format": "int32",
            "default": 120,
            "description": "Time penalty in seconds for not obeying a specified heading. Requires `ch.disable=true`.\n"
          },
          "pass_through": {
            "type": "boolean",
            "default": false,
            "description": "If `true`, u-turns are avoided at via-points with regard to the `heading_penalty`. Requires `ch.disable=true`.\n"
          },
          "block_area": {
            "type": "string",
            "description": "Block road access via a point with the format `latitude,longitude`\nor an area defined by a circle `lat,lon,radius` or a rectangle `lat1,lon1,lat2,lon2`.\nSeparate several values with `;`. Requires `ch.disable=true`.\n"
          },
          "avoid": {
            "type": "string",
            "description": "Specify which road classes and environments you would like to avoid.\nPossible values are `motorway`, `steps`, `track`, `toll`, `ferry`, `tunnel` and `bridge`.\nSeparate several values with `;`. Obviously not all the values make sense for all vehicle profiles e.g. `bike` is already forbidden on a `motorway`. Requires `ch.disable=true`.\n"
          },
          "algorithm": {
            "type": "string",
            "enum": [
              "round_trip",
              "alternative_route"
            ],
            "description": "Rather than looking for the shortest or fastest path, this lets you solve two different problems related to routing:\nWith `round_trip`, the route will get you back to where you started. This is meant for fun (think of\na bike trip), so we will add some randomness. This requires `ch.disable=true`.\nWith `alternative_route`, we give you not one but several routes that are close to optimal, but\nnot too similar to each other. You can control both of these features with additional parameters, see below.\n"
          },
          "round_trip.distance": {
            "type": "integer",
            "format": "int32",
            "default": 10000,
            "description": "If `algorithm=round_trip`, this parameter configures approximative length of the resulting round trip. Requires `ch.disable=true`.\n"
          },
          "round_trip.seed": {
            "type": "integer",
            "format": "int64",
            "description": "If `algorithm=round_trip`, this sets the random seed. Change this to get a different tour for each value.\n"
          },
          "alternative_route.max_paths": {
            "type": "integer",
            "format": "int32",
            "default": 2,
            "description": "If `algorithm=alternative_route`, this parameter sets the number of maximum paths which should be calculated. Increasing can lead to worse alternatives.\n"
          },
          "alternative_route.max_weight_factor": {
            "type": "number",
            "default": 1.4,
            "description": "If `algorithm=alternative_route`, this parameter sets the factor by which the alternatives routes can be longer than the optimal route. Increasing can lead to worse alternatives.\n"
          },
          "alternative_route.max_share_factor": {
            "type": "number",
            "default": 0.6,
            "description": "If `algorithm=alternative_route`, this parameter specifies how similar an alternative route can be to the optimal route. Increasing can lead to worse alternatives.\n"
          }
        }
      },
      "RouteResponse": {
        "type": "object",
        "properties": {
          "paths": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/RouteResponsePath"
            }
          },
          "info": {
            "$ref": "#/components/schemas/ResponseInfo"
          }
        },
        "example": {
          "info": {
            "copyrights": [
              "GraphHopper",
              "OpenStreetMap contributors"
            ],
            "took": 15
          },
          "paths": [
            {
              "bbox": [
                13.362853824187303,
                52.469481955531585,
                13.385836736460217,
                52.473849308838446
              ],
              "distance": 2138.3027624572337,
              "instructions": [
                {
                  "distance": 1268.519329705091,
                  "interval": [
                    0,
                    10
                  ],
                  "sign": 0,
                  "text": "Geradeaus auf A 100",
                  "time": 65237
                },
                {
                  "distance": 379.74399999999997,
                  "interval": [
                    10,
                    11
                  ],
                  "sign": 0,
                  "text": "Geradeaus auf Strasse",
                  "time": 24855
                },
                {
                  "distance": 16.451,
                  "interval": [
                    11,
                    11
                  ],
                  "sign": 0,
                  "text": "Geradeaus auf Tempelhofer Damm",
                  "time": 1316
                },
                {
                  "distance": 473.58843275214315,
                  "interval": [
                    11,
                    12
                  ],
                  "sign": -2,
                  "text": "Links abbiegen auf Tempelhofer Damm, B 96",
                  "time": 37882
                },
                {
                  "distance": 0,
                  "interval": [
                    12,
                    12
                  ],
                  "sign": 4,
                  "text": "Ziel erreicht!",
                  "time": 0
                }
              ],
              "points": "oxg_Iy|ppAl@wCdE}LfFsN|@_Ej@eEtAaMh@sGVuDNcDb@{PFyGdAi]FoC?q@sXQ_@?",
              "points_encoded": true,
              "details": {
                "street_name": [
                  [
                    0,
                    1,
                    "Rue Principale"
                  ],
                  [
                    1,
                    13,
                    "D19E"
                  ],
                  [
                    13,
                    18,
                    "D19"
                  ],
                  ".."
                ],
                "toll": [
                  [
                    0,
                    25,
                    "no"
                  ],
                  [
                    25,
                    146,
                    "all"
                  ],
                  [
                    146,
                    158,
                    "no"
                  ],
                  [
                    158,
                    204,
                    "all"
                  ],
                  ".."
                ],
                "max_speed": [
                  [
                    0,
                    25,
                    -1
                  ],
                  [
                    25,
                    98,
                    130
                  ],
                  [
                    98,
                    113,
                    90
                  ],
                  [
                    113,
                    140,
                    130
                  ],
                  [
                    140,
                    143,
                    110
                  ],
                  ".."
                ]
              },
              "time": 129290
            }
          ]
        }
      },
      "EncodedLineString": {
        "type": "string",
        "description": "A polyline-encoded list of positions. You'll need to decode this string in client code. We provide open source code in [Java](https://github.com/graphhopper/graphhopper/blob/e649aaed8d3f4378bf2d8889bbbc2318261eabb2/web-api/src/main/java/com/graphhopper/http/WebHelper.java#L54) and [JavaScript](https://github.com/graphhopper/directions-api-js-client/blob/cf43d1a5bc93a3e8007a44fcfc551117e4fa49bc/src/GHUtil.js#L27)."
      },
      "RouteResponsePath": {
        "type": "object",
        "properties": {
          "distance": {
            "description": "The total distance, in meters. To get this information for one 'leg' please read [this blog post](https://www.graphhopper.com/blog/2019/11/28/routing-api-using-path-details/).\n",
            "type": "number",
            "format": "double"
          },
          "time": {
            "description": "The total travel time, in milliseconds. To get this information for one 'leg' please read [this blog post](https://www.graphhopper.com/blog/2019/11/28/routing-api-using-path-details/).\n",
            "type": "integer",
            "format": "int64"
          },
          "ascend": {
            "description": "The total ascent, in meters.\n",
            "type": "number",
            "format": "double"
          },
          "descend": {
            "description": "The total descent, in meters.\n",
            "type": "number",
            "format": "double"
          },
          "points": {
            "allOf": [
              {
                "description": "The geometry of the route. The format depends on the value of `points_encoded`.\n"
              },
              {
                "anyOf": [
                  {
                    "$ref": "#/components/schemas/EncodedLineString"
                  },
                  {
                    "$ref": "#/components/schemas/LineString"
                  }
                ]
              }
            ]
          },
          "snapped_waypoints": {
            "allOf": [
              {
                "description": "The snapped input points. The format depends on the value of `points_encoded`.\n"
              },
              {
                "anyOf": [
                  {
                    "$ref": "#/components/schemas/EncodedLineString"
                  },
                  {
                    "$ref": "#/components/schemas/LineString"
                  }
                ]
              }
            ]
          },
          "points_encoded": {
            "description": "Whether the `points` and `snapped_waypoints` fields are polyline-encoded strings rather than JSON arrays\nof coordinates. See the field description for more information on the two formats.\n",
            "type": "boolean"
          },
          "bbox": {
            "description": "The bounding box of the route geometry. Format: `[minLon, minLat, maxLon, maxLat]`.\n",
            "type": "array",
            "items": {
              "type": "number",
              "format": "double"
            }
          },
          "instructions": {
            "type": "array",
            "description": "The instructions for this route. This feature is under active development, and our instructions can sometimes be misleading,\nso be mindful when using them for navigation.\n",
            "items": {
              "type": "object",
              "properties": {
                "text": {
                  "type": "string",
                  "description": "A description what the user has to do in order to follow the route. The language depends on the locale parameter.\n"
                },
                "street_name": {
                  "type": "string",
                  "description": "The name of the street to turn onto in order to follow the route.\n"
                },
                "distance": {
                  "type": "number",
                  "format": "double",
                  "description": "The distance for this instruction, in meters.\n"
                },
                "time": {
                  "type": "integer",
                  "format": "int32",
                  "description": "The duration for this instruction, in milliseconds.\n"
                },
                "interval": {
                  "type": "array",
                  "items": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "description": "Two indices into `points`, referring to the beginning and the end of the segment of the route\nthis instruction refers to.\n"
                },
                "sign": {
                  "type": "integer",
                  "format": "int32",
                  "description": "A number which specifies the sign to show:\n\n| sign | description  |\n|---|---|\n|-98| an U-turn without the knowledge if it is a right or left U-turn |\n| -8| a left U-turn |\n| -7| keep left |\n| -6| **not yet used**: leave roundabout |\n| -3| turn sharp left |\n| -2| turn left |\n| -1| turn slight left |\n|  0| continue on street |\n|  1| turn slight right |\n|  2| turn right |\n|  3| turn sharp right |\n|  4| the finish instruction before the last point |\n|  5| the instruction before a via point |\n|  6| the instruction before entering a roundabout |\n|  7| keep right |\n|  8| a right U-turn |\n|  *| **For future compatibility** it is important that all clients are able to handle also unknown instruction sign numbers\n"
                },
                "exit_number": {
                  "type": "integer",
                  "format": "int32",
                  "description": "Only available for roundabout instructions (sign is 6). The count of exits at which the route leaves the roundabout.\n"
                },
                "turn_angle": {
                  "type": "number",
                  "format": "double",
                  "description": "Only available for roundabout instructions (sign is 6). The radian of the route within the roundabout `0 < r < 2*PI` for clockwise and\n`-2*PI < r < 0` for counterclockwise turns.\n"
                }
              }
            }
          },
          "details": {
            "type": "object",
            "description": "Details, as requested with the `details` parameter. Consider the value `{\"street_name\": [[0,2,\"Frankfurter Straße\"],[2,6,\"Zollweg\"]]}`.\nIn this example, the route uses two streets: The first, Frankfurter Straße, is\nused between `points[0]` and `points[2]`, and the second, Zollweg, between `points[2]` and `points[6]`.\nSee [here](https://discuss.graphhopper.com/t/2539) for discussion.\n"
          },
          "points_order": {
            "type": "array",
            "items": {
              "type": "integer"
            },
            "description": "An array of indices (zero-based), specifiying the order in which the input points are visited.\nOnly present if the `optimize` parameter was used.\n"
          }
        }
      },
      "ResponseInfo": {
        "type": "object",
        "description": "Additional information for your request",
        "properties": {
          "copyrights": {
            "description": "Attribution according to our documentation is necessary if no white-label option included.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "took": {
            "type": "number",
            "format": "double"
          }
        }
      },
      "InfoResponse": {
        "type": "object",
        "description": "Information about the server and the geographical area that it covers.",
        "properties": {
          "version": {
            "type": "string",
            "description": "The version of the GraphHopper server that provided this response. This is not related to the API version.\n"
          },
          "bbox": {
            "type": "string",
            "description": "The bounding box of the geographical area covered by this GraphHopper instance. Format: `\"minLon,minLat,maxLon,maxLat\"\n"
          },
          "features": {
            "type": "object",
            "description": "The supported features, such as elevation, per vehicle profile.\n"
          }
        },
        "example": {
          "build_date": "2014-02-21T16:52",
          "bbox": [
            13.072624,
            52.333508,
            13.763972,
            52.679616
          ],
          "version": "0.4",
          "features": {
            "foot": {
              "elevation": true
            },
            "car": {
              "elevation": false
            }
          }
        }
      },
      "IsochroneResponse": {
        "type": "object",
        "properties": {
          "polygons": {
            "type": "array",
            "description": "The list of polygons in GeoJson format. It can be used e.g. in the Leaflet framework:\n\n```\nL.geoJson(json.polygons).addTo(map)\n```\n\nThe number of polygon is identical to the specified buckets in the query. Every polygon contains the bucket number in the properties section of the GeoJson.\n",
            "items": {
              "$ref": "#/components/schemas/IsochroneResponsePolygon"
            }
          },
          "copyrights": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "example": {
          "polygons": [
            {
              "properties": {
                "bucket": 0
              },
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    13.351851,
                    52.51345
                  ],
                  [
                    13.350402,
                    52.516949
                  ],
                  [
                    13.352598,
                    52.522252
                  ],
                  [
                    13.351851,
                    52.51345
                  ]
                ]
              }
            }
          ]
        }
      },
      "IsochroneResponsePolygon": {
        "type": "object",
        "description": "A found path",
        "properties": {
          "properties": {
            "type": "object",
            "properties": {
              "bucket": {
                "type": "integer",
                "format": "int32"
              }
            }
          },
          "type": {
            "type": "string"
          },
          "geometry": {
            "$ref": "#/components/schemas/Polygon"
          }
        }
      },
      "LineString": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "coordinates": {
            "type": "array",
            "description": "A list of coordinate pairs or triples, `[lon,lat]` or `[lon,lat,elevation]`.\n",
            "items": {
              "type": "array",
              "items": {
                "type": "number"
              }
            }
          }
        }
      },
      "Polygon": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "coordinates": {
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              }
            }
          }
        }
      },
      "GHError": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          },
          "hints": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "JobId": {
        "type": "object",
        "properties": {
          "job_id": {
            "type": "string",
            "format": "uuid",
            "description": "UUID. Unique id for your job/request with which you can fetch your solution",
            "example": "44886560-b584-4da5-b245-768151dacd8f"
          }
        }
      },
      "BadRequest": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "description": "Short error message",
            "example": "Bad Request"
          },
          "hints": {
            "type": "array",
            "description": "More detailed information about the error.",
            "items": {
              "$ref": "#/components/schemas/ErrorMessage"
            }
          },
          "status": {
            "type": "string",
            "description": "status",
            "default": "finished",
            "example": "finished"
          }
        }
      },
      "ErrorMessage": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "description": "error message",
            "example": "unsupported json property [vehiles]. allowed properties: [vehicles, vehicle_types, services, shipments, relations, algorithm, objectives, cost_matrices, configuration]"
          },
          "details": {
            "type": "string",
            "description": "Details",
            "example": "class java.lang.IllegalArgumentException"
          }
        }
      },
      "InternalErrorMessage": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "default": 500,
            "example": 500
          },
          "message": {
            "type": "string",
            "description": "Details",
            "example": "There has been an internal server error."
          }
        }
      },
      "Request": {
        "type": "object",
        "properties": {
          "vehicles": {
            "type": "array",
            "description": "Specifies the available vehicles.",
            "minItems": 1,
            "items": {
              "$ref": "#/components/schemas/Vehicle"
            }
          },
          "vehicle_types": {
            "type": "array",
            "description": "Specifies the available vehicle types. These types can be assigned to vehicles.",
            "items": {
              "$ref": "#/components/schemas/VehicleType"
            }
          },
          "services": {
            "type": "array",
            "description": "Specifies the orders of the type \"service\". These are, for example, pick-ups, deliveries or other stops that are to be approached by the specified vehicles. Each of these orders contains only one location.",
            "items": {
              "$ref": "#/components/schemas/Service"
            }
          },
          "shipments": {
            "type": "array",
            "description": "Specifies the available shipments. Each shipment contains a pickup and a delivery stop, which must be processed one after the other.",
            "items": {
              "$ref": "#/components/schemas/Shipment"
            }
          },
          "relations": {
            "type": "array",
            "description": "Defines additional relationships between orders.",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/JobRelation"
                },
                {
                  "$ref": "#/components/schemas/GroupRelation"
                }
              ]
            }
          },
          "algorithm": {
            "$ref": "#/components/schemas/Algorithm"
          },
          "objectives": {
            "type": "array",
            "description": "Specifies an objective function. The vehicle routing problem is solved in such a way that this objective function is minimized.",
            "items": {
              "$ref": "#/components/schemas/Objective"
            },
            "example": [
              {
                "type": "min",
                "value": "vehicles"
              },
              {
                "type": "min",
                "value": "completion_time"
              }
            ]
          },
          "cost_matrices": {
            "type": "array",
            "description": "Specifies your own tranport time and distance matrices.",
            "items": {
              "$ref": "#/components/schemas/CostMatrix"
            },
            "example": [
              {
                "profile": "car",
                "location_ids": [
                  "start",
                  "Dammstrasse",
                  "Bergstrasse",
                  "Koppstrasse",
                  "start2",
                  "nirvana"
                ],
                "data": {
                  "times": [
                    [
                      0,
                      1000,
                      1400,
                      2000,
                      0,
                      4000
                    ],
                    [
                      1000,
                      0,
                      1000,
                      2100,
                      1000,
                      4000
                    ],
                    [
                      1400,
                      1000,
                      0,
                      1100,
                      1100,
                      4000
                    ],
                    [
                      2000,
                      2100,
                      1100,
                      0,
                      1200,
                      4000
                    ],
                    [
                      0,
                      1000,
                      1400,
                      2000,
                      0,
                      4000
                    ],
                    [
                      4000,
                      4000,
                      4000,
                      4000,
                      4000,
                      4000
                    ]
                  ],
                  "distances": [
                    [
                      0,
                      1000,
                      1400,
                      2000,
                      0,
                      4000
                    ],
                    [
                      1000,
                      0,
                      1000,
                      2100,
                      1000,
                      4000
                    ],
                    [
                      1400,
                      1000,
                      0,
                      1100,
                      1100,
                      4000
                    ],
                    [
                      2000,
                      2100,
                      1100,
                      0,
                      1200,
                      4000
                    ],
                    [
                      0,
                      1000,
                      1400,
                      2000,
                      0,
                      4000
                    ],
                    [
                      4000,
                      4000,
                      4000,
                      4000,
                      4000,
                      4000
                    ]
                  ]
                }
              }
            ]
          },
          "configuration": {
            "$ref": "#/components/schemas/Configuration",
            "description": "Specifies general configurations."
          }
        }
      },
      "Vehicle": {
        "type": "object",
        "properties": {
          "vehicle_id": {
            "type": "string",
            "description": "Specifies the ID of the vehicle. Ids must be unique, i.e. if there are two vehicles with the same ID, an error is returned.",
            "example": "vehicle-1"
          },
          "type_id": {
            "type": "string",
            "description": "The type ID assigns a vehicle type to this vehicle. You can specify types in the array of vehicle types. If you omit the type ID, the default type is used. The default type is a `car` with a capacity of 0.",
            "default": "default-type",
            "example": "my-own-type"
          },
          "start_address": {
            "$ref": "#/components/schemas/Address"
          },
          "end_address": {
            "$ref": "#/components/schemas/Address",
            "description": "If this is omitted AND return_to_depot is true then the vehicle needs to return to its start_address."
          },
          "break": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/TimeWindowBreak"
              },
              {
                "$ref": "#/components/schemas/DriveTimeBreak"
              }
            ]
          },
          "return_to_depot": {
            "type": "boolean",
            "description": "If it is false, the algorithm decides where to end the vehicle route. It ends in one of your customers' locations. The end is chosen such that it contributes to the overall objective function, e.g. min transport_time. If it is true, you can either specify a specific end location (which is then regarded as end depot) or you can leave it and the driver returns to its start location.",
            "default": true
          },
          "earliest_start": {
            "type": "integer",
            "format": "int64",
            "description": "Earliest start of vehicle in seconds. It is recommended to use the unix timestamp.",
            "default": 0
          },
          "latest_end": {
            "type": "integer",
            "format": "int64",
            "description": "Latest end of vehicle in seconds, i.e. the time the vehicle needs to be at its end location at latest.",
            "default": 9223372036854776000
          },
          "skills": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Array of skills, i.e. array of string (not case sensitive).",
            "example": [
              "drilling_maschine",
              "screw_driver"
            ]
          },
          "max_distance": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the maximum distance (in meters) a vehicle can go.",
            "example": 400000
          },
          "max_driving_time": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the maximum drive time (in seconds) a vehicle/driver can go, i.e. the maximum time on the road (service and waiting times are not included here)",
            "example": 28800
          },
          "max_jobs": {
            "type": "integer",
            "format": "int32",
            "description": "Specifies the maximum number of jobs a vehicle can load.",
            "example": 12
          },
          "min_jobs": {
            "type": "integer",
            "format": "int32",
            "description": "Specifies the minimum number of jobs a vehicle should load. This is a soft constraint, i.e. if it is not possible to fulfill “min_jobs”, we will still try to get as close as possible to this constraint.",
            "example": 12
          },
          "max_activities": {
            "type": "integer",
            "format": "int32",
            "description": "Specifies the maximum number of activities a vehicle can conduct.",
            "example": 24
          },
          "move_to_end_address": {
            "type": "boolean",
            "description": "Indicates whether a vehicle should be moved even though it has not been assigned any jobs."
          }
        },
        "required": [
          "vehicle_id",
          "start_address"
        ]
      },
      "VehicleProfileId": {
        "type": "string",
        "enum": [
          "car",
          "bike",
          "foot",
          "hike",
          "mtb",
          "racingbike",
          "scooter",
          "truck",
          "small_truck"
        ],
        "default": "car"
      },
      "Algorithm": {
        "type": "object",
        "description": "Use `objectives` instead.",
        "deprecated": true,
        "properties": {
          "problem_type": {
            "type": "string",
            "enum": [
              "min",
              "min-max"
            ]
          },
          "objective": {
            "type": "string",
            "enum": [
              "transport_time",
              "completion_time"
            ]
          }
        }
      },
      "Address": {
        "type": "object",
        "properties": {
          "location_id": {
            "type": "string",
            "description": "Specifies the id of the location.",
            "example": "550e8400-e29b-11d4-a716-446655440000"
          },
          "name": {
            "type": "string",
            "description": "Name of location.",
            "example": "Queens Victoria Street 70, Second Floor, Flat 245"
          },
          "lon": {
            "format": "double",
            "type": "number",
            "description": "Longitude of location.",
            "example": -0.092869
          },
          "lat": {
            "format": "double",
            "type": "number",
            "description": "Latitude of location.",
            "example": 51.512665
          },
          "street_hint": {
            "type": "string",
            "description": "Optional parameter. Specifies a hint for each address to better snap the coordinates (lon,lat) to road network. E.g. if there is an address or house with two or more neighboring streets you can control for which street the closest location is looked up.",
            "example": "Queens Victoria Street 70"
          },
          "curbside": {
            "type": "string",
            "enum": [
              "right",
              "left",
              "any"
            ],
            "default": "any",
            "description": "Optional parameter. Specifies on which side a point should be relative to the driver when she leaves/arrives at a start/target/via point. Only supported for motor vehicles and OpenStreetMap.",
            "example": "If you would like to arrive at this address without having to cross the street use `curbside=right/left` for countries with right/left-hand driving. Using `curbside=any` is the same as not specifying this parameter at all."
          }
        },
        "required": [
          "location_id",
          "lon",
          "lat"
        ]
      },
      "ResponseAddress": {
        "type": "object",
        "description": "Address of activity",
        "properties": {
          "location_id": {
            "type": "string",
            "description": "Specifies the id of the location.",
            "example": "550e8400-e29b-11d4-a716-446655440000"
          },
          "name": {
            "type": "string",
            "description": "Name of location.",
            "example": "Queens Victoria Street 70, Second Floor, Flat 245"
          },
          "lon": {
            "format": "double",
            "type": "number",
            "description": "Longitude of location.",
            "example": -0.092869
          },
          "lat": {
            "format": "double",
            "type": "number",
            "description": "Latitude of location.",
            "example": 51.512665
          },
          "street_hint": {
            "type": "string",
            "description": "Optional parameter. Specifies a hint for each address to better snap the coordinates (lon,lat) to road network. E.g. if there is an address or house with two or more neighboring streets you can control for which street the closest location is looked up.",
            "example": "Queens Victoria Street 70"
          },
          "snapped_waypoint": {
            "$ref": "#/components/schemas/SnappedWaypoint"
          }
        }
      },
      "SnappedWaypoint": {
        "type": "object",
        "description": "Access point to the (road)network. It is only available if `return_snapped_waypoints` is true (be default it is false).",
        "properties": {
          "lon": {
            "format": "double",
            "type": "number",
            "description": "Longitude of location.",
            "example": -0.092869
          },
          "lat": {
            "format": "double",
            "type": "number",
            "description": "Latitude of location.",
            "example": 51.512665
          }
        }
      },
      "DriveTimeBreak": {
        "type": "object",
        "properties": {
          "duration": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the duration of the break in seconds.",
            "example": 2700
          },
          "max_driving_time": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the max driving time (in a row) without break in seconds.",
            "example": 14400
          },
          "initial_driving_time": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the initial (current) driving time of a driver to allow dynamic adaptations in seconds.",
            "example": 3600
          },
          "possible_split": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            },
            "description": "Array specifying how a break duration (in seconds) can be split into several smaller breaks",
            "example": [
              900,
              1800
            ]
          }
        },
        "required": [
          "duration",
          "max_driving_time"
        ]
      },
      "TimeWindowBreak": {
        "type": "object",
        "properties": {
          "earliest": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the earliest start time of the break in seconds.",
            "example": 1550136467
          },
          "latest": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the latest start time of break in seconds.",
            "example": 1550148467
          },
          "duration": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the duration of the break in seconds.",
            "example": 2700
          }
        },
        "required": [
          "earliest",
          "latest",
          "duration"
        ]
      },
      "VehicleType": {
        "type": "object",
        "properties": {
          "type_id": {
            "type": "string",
            "description": "Specifies the id of the vehicle type. If a vehicle needs to be of this type, it should refer to this with its type_id attribute.",
            "example": "my-own-type"
          },
          "profile": {
            "allOf": [
              {
                "description": "Specifies the vehicle profile of this type. The profile is used to determine the network, speed and other physical attributes to use for routing the vehicle."
              },
              {
                "$ref": "#/components/schemas/VehicleProfileId"
              }
            ]
          },
          "capacity": {
            "type": "array",
            "description": "Specifies an array of capacity dimension values which need to be int values. For example, if there are two dimensions such as volume and weight then it needs to be defined as [ 1000, 300 ] assuming a maximum volume of 1000 and a maximum weight of 300.",
            "items": {
              "type": "integer",
              "format": "int32"
            },
            "default": [
              0
            ],
            "example": [
              100,
              500
            ]
          },
          "speed_factor": {
            "format": "double",
            "type": "number",
            "description": "Specifies a speed factor for this vehicle type. If the vehicle that uses this type needs to be only half as fast as what is actually calculated with our routing engine then set the speed factor to 0.5.",
            "default": 1
          },
          "service_time_factor": {
            "format": "double",
            "type": "number",
            "description": "Specifies a service time factor for this vehicle type. If the vehicle/driver that uses this type is able to conduct the service as double as fast as it is determined in the corresponding service or shipment then set it to 0.5.",
            "default": 1
          },
          "cost_per_meter": {
            "format": "double",
            "type": "number",
            "description": "**_BETA feature_**! Cost parameter per distance unit, here meter is used"
          },
          "cost_per_second": {
            "format": "double",
            "type": "number",
            "description": "**_BETA feature_**! Cost parameter per time unit, here second is used"
          },
          "cost_per_activation": {
            "format": "double",
            "type": "number",
            "description": "**_BETA feature_**! Cost parameter vehicle activation, i.e. fixed costs per vehicle"
          },
          "consider_traffic": {
            "type": "boolean",
            "description": "Specifies whether traffic should be considered. if \"tomtom\" is used and this is false, free flow travel times from \"tomtom\" are calculated. If this is true, historical traffic info are used. We do not yet have traffic data for \"openstreetmap\", thus, setting this true has no effect at all.",
            "default": false
          },
          "network_data_provider": {
            "type": "string",
            "description": "Specifies the network data provider. Either use [`openstreetmap`](#section/Map-Data-and-Routing-Profiles/OpenStreetMap) (default) or [`tomtom`](#section/Map-Data-and-Routing-Profiles/TomTom) (add-on required).",
            "enum": [
              "openstreetmap",
              "tomtom"
            ],
            "default": "openstreetmap"
          }
        },
        "required": [
          "type_id"
        ]
      },
      "Service": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Specifies the id of the service. Ids need to be unique so there must not be two services/shipments with the same id.",
            "example": "7fe77504-7df8-4497-843c-02d70b6490ce"
          },
          "type": {
            "type": "string",
            "description": "Specifies type of service. This makes a difference if items are loaded or unloaded, i.e. if one of the size dimensions > 0. If it is specified as `service` or `pickup`, items are loaded and will stay in the vehicle for the rest of the route (and thus consumes capacity for the rest of the route). If it is a `delivery`, items are implicitly loaded at the beginning of the route and will stay in the route until delivery (and thus releases capacity for the rest of the route).",
            "enum": [
              "service",
              "pickup",
              "delivery"
            ],
            "default": "service",
            "example": "delivery"
          },
          "priority": {
            "type": "integer",
            "format": "int32",
            "description": "Specifies the priority. Can be 1 = high priority to 10 = low priority. Often there are more services/shipments than the available vehicle fleet can handle. Then you can set priorities to differentiate high priority tasks from those that could be left unassigned. I.e. the lower the priority the earlier these tasks are omitted in the solution.",
            "default": 2,
            "example": 1
          },
          "name": {
            "type": "string",
            "description": "Meaningful name for service, e.g. `\"deliver pizza\"`.",
            "example": "delivery pizza"
          },
          "address": {
            "$ref": "#/components/schemas/Address"
          },
          "duration": {
            "type": "integer",
            "minimum": 0,
            "maximum": 604800,
            "format": "int64",
            "description": "Specifies the duration of the service in seconds, i.e. how long it takes at the customer site.",
            "default": 0,
            "example": 1800
          },
          "preparation_time": {
            "type": "integer",
            "format": "int64",
            "minimum": 0,
            "maximum": 604800,
            "description": "Specifies the preparation time in seconds. It can be used to model parking lot search time since if you have 3 identical locations in a row, it only falls due once.",
            "default": 0,
            "example": 300
          },
          "time_windows": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TimeWindow"
            },
            "description": "Specifies an array of time window objects (see time_window object below). Specify the time either with the recommended Unix time stamp (the number of seconds since 1970-01-01) or you can also count the seconds relative to Monday morning 00:00 and define the whole week in seconds. For example, Monday 9am is then represented by 9hour * 3600sec/hour = 32400. In turn, Wednesday 1pm corresponds to 2day * 24hour/day * 3600sec/hour + 1day * 13hour/day * 3600sec/hour = 219600. See this tutorial for more information.",
            "example": [
              {
                "earliest": 32400,
                "latest": 36000
              },
              {
                "earliest": 50400,
                "latest": 54000
              }
            ]
          },
          "size": {
            "type": "array",
            "description": "Size can have multiple dimensions and should be in line with the capacity dimension array of the vehicle type. For example, if the item that needs to be delivered has two size dimension, volume and weight, then specify it as follow [ 20, 5 ] assuming a volume of 20 and a weight of 5.",
            "items": {
              "type": "integer",
              "format": "int32"
            },
            "default": [
              0
            ],
            "example": [
              30,
              5,
              1
            ]
          },
          "required_skills": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Specifies an array of required skills, i.e. array of string (not case sensitive). For example, if this service needs to be conducted by a technician having a `drilling_machine` and a `screw_driver` then specify the array as follows: `[\"drilling_machine\",\"screw_driver\"]`. This means that the service can only be done by a vehicle (technician) that has the skills `drilling_machine` AND `screw_driver` in its skill array. Otherwise it remains unassigned.",
            "example": [
              "drilling_machine",
              "screw_driver"
            ]
          },
          "allowed_vehicles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Specifies an array of allowed vehicles, i.e. array of vehicle ids. For example, if this service can only be conducted EITHER by `technician_peter` OR `technician_stefan` specify this as follows: `[\"technician_peter\",\"technician_stefan\"]`.",
            "example": [
              "technician_peter",
              "technician_stefan"
            ]
          },
          "disallowed_vehicles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Specifies an array of disallowed vehicles, i.e. array of vehicle ids.",
            "example": [
              "driver-A",
              "driver-B"
            ]
          },
          "max_time_in_vehicle": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the maximum time in seconds a delivery can stay in the vehicle. Currently, it only works with services of \"type\":\"delivery\".",
            "default": 9223372036854776000,
            "example": 900
          },
          "group": {
            "type": "string",
            "description": "Group this service belongs to. See the group relation and [this post](https://discuss.graphhopper.com/t/4040) on how to utilize this.",
            "example": "group-A"
          }
        },
        "required": [
          "id"
        ]
      },
      "Shipment": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Specifies the id of the shipment. Ids need to be unique so there must not be two services/shipments with the same id.",
            "example": "7fe77504-7df8-4497-843c-02d70b6490ce"
          },
          "name": {
            "type": "string",
            "description": "Meaningful name for shipment, e.g. \"pickup and deliver pizza to Peter\".",
            "example": "pickup and deliver pizza to Peter"
          },
          "priority": {
            "type": "integer",
            "format": "int32",
            "description": "Specifies the priority. Can be 1 = high priority to 10 = low priority. Often there are more services/shipments than the available vehicle fleet can handle. Then you can set priorities to differentiate high priority tasks from those that could be left unassigned. I.e. the lower the priority the earlier these tasks are omitted in the solution.",
            "default": 2,
            "example": 1
          },
          "pickup": {
            "$ref": "#/components/schemas/Stop"
          },
          "delivery": {
            "$ref": "#/components/schemas/Stop"
          },
          "size": {
            "type": "array",
            "description": "Size can have multiple dimensions and should be in line with the capacity dimension array of the vehicle type. For example, if the item that needs to be delivered has two size dimension, volume and weight, then specify it as follow [ 20, 5 ] assuming a volume of 20 and a weight of 5.",
            "items": {
              "type": "integer",
              "format": "int32"
            },
            "default": [
              0
            ],
            "example": [
              3
            ]
          },
          "required_skills": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Specifies an array of required skills, i.e. array of string (not case sensitive). For example, if this shipment needs to be conducted by a technician having a `drilling_machine` and a `screw_driver` then specify the array as follows: `[\"drilling_machine\",\"screw_driver\"]`. This means that the service can only be done by a vehicle (technician) that has the skills `drilling_machine` AND `screw_driver` in its skill array. Otherwise it remains unassigned.",
            "example": [
              "drilling_machine",
              "screw_driver"
            ]
          },
          "allowed_vehicles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Specifies an array of allowed vehicles, i.e. array of vehicle ids. For example, if this shipment can only be conducted EITHER by \"technician_peter\" OR \"technician_stefan\" specify this as follows: [\"technician_peter\",\"technician_stefan\"].",
            "example": [
              "technician_peter",
              "technician_stefan"
            ]
          },
          "disallowed_vehicles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Specifies an array of disallowed vehicles, i.e. array of vehicle ids.",
            "example": [
              "driver-A",
              "driver-B"
            ]
          },
          "max_time_in_vehicle": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the maximum time in seconds a shipment can stay in the vehicle.",
            "default": 9223372036854776000,
            "example": 1800
          }
        },
        "required": [
          "id",
          "pickup",
          "delivery"
        ]
      },
      "Pickup": {
        "$ref": "#/components/schemas/Stop"
      },
      "Stop": {
        "type": "object",
        "properties": {
          "address": {
            "$ref": "#/components/schemas/Address",
            "description": "Specifies pickup or delivery address."
          },
          "duration": {
            "type": "integer",
            "minimum": 0,
            "maximum": 604800,
            "format": "int64",
            "description": "Specifies the duration of the pickup or delivery in seconds, e.g. how long it takes unload items at the customer site.",
            "default": 0,
            "example": 1800
          },
          "preparation_time": {
            "type": "integer",
            "minimum": 0,
            "maximum": 604800,
            "format": "int64",
            "description": "Specifies the preparation time in seconds. It can be used to model parking lot search time since if you have 3 identical locations in a row, it only falls due once.",
            "default": 0,
            "example": 300
          },
          "time_windows": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TimeWindow"
            },
            "description": "Specifies an array of time window objects (see time window object below). For example, if an item needs to be delivered between 7am and 10am then specify the array as follows: [ { \"earliest\": 25200, \"latest\" : 32400 } ] (starting the day from 0 in seconds).",
            "example": [
              {
                "earliest": 32400,
                "latest": 36000
              },
              {
                "earliest": 50400,
                "latest": 54000
              }
            ]
          },
          "group": {
            "type": "string",
            "description": "Group this stop belongs to. See the group relation and [this post](https://discuss.graphhopper.com/t/4040) on how to utilize this.",
            "example": "ASAP"
          }
        }
      },
      "TimeWindow": {
        "type": "object",
        "properties": {
          "earliest": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the opening time of the time window in seconds, i.e. the earliest time the service can start.",
            "default": 0
          },
          "latest": {
            "type": "integer",
            "format": "int64",
            "description": "Specifies the closing time of the time window in seconds, i.e. the latest time the service can start.",
            "default": 9223372036854776000
          }
        }
      },
      "Configuration": {
        "type": "object",
        "description": "Specifies general configurations that are taken into account when solving the vehicle routing problem.",
        "properties": {
          "routing": {
            "$ref": "#/components/schemas/Routing"
          }
        }
      },
      "Routing": {
        "type": "object",
        "description": "This contains all routing specific configurations.",
        "properties": {
          "calc_points": {
            "type": "boolean",
            "description": "It lets you specify whether the API should provide you with route geometries for vehicle routes or not. Thus, you do not need to do extra routing to get the polyline for each route.",
            "default": false
          },
          "consider_traffic": {
            "type": "boolean",
            "description": "indicates whether historical traffic information should be considered",
            "default": false
          },
          "network_data_provider": {
            "type": "string",
            "description": "specifies the data provider, read more about it [here](#section/Map-Data-and-Routing-Profiles).",
            "enum": [
              "openstreetmap",
              "tomtom"
            ],
            "default": "openstreetmap"
          },
          "curbside_strictness": {
            "type": "string",
            "default": "soft",
            "description": "In some cases curbside constraints cannot be fulfilled. For example in one-way streets you cannot arrive at a building that is on the left side of the street such that the building is to the right of you (unless you drove the one-way street the wrong/illegal way). You can set the `curbside_strictness` to `soft` to ignore the curbside constraint in such cases or set it to `strict` to get an error response instead. You can also set it to `ignore` to ignore all curbside constraints (this is useful to compare the results with and without constraints without modifying every single address).",
            "enum": [
              "ignore",
              "soft",
              "strict"
            ]
          },
          "fail_fast": {
            "type": "boolean",
            "description": "indicates whether matrix calculation should fail fast when points cannot be connected",
            "default": true
          },
          "return_snapped_waypoints": {
            "type": "boolean",
            "description": "Indicates whether a solution includes snapped waypoints. In contrary to the address coordinate a snapped waypoint is the access point to the (road) network.",
            "default": false
          },
          "snap_preventions": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "motorway",
                "trunk",
                "bridge",
                "ford",
                "tunnel",
                "ferry"
              ]
            },
            "description": "Prevents snapping locations to road links of specified road types, e.g. to motorway.",
            "example": [
              "motorway",
              "trunk",
              "bridge",
              "tunnel",
              "ferry"
            ]
          }
        }
      },
      "Objective": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Type of objective function, i.e. `min` or `min-max`.\n\n * `min`: Minimizes the objective value.\n * `min-max`: Minimizes the maximum objective value.\n\nFor instance, `min` -> `vehicles` minimizes the number of employed vehicles.\n`min` -> `completion_time` minimizes the sum of your vehicle routes' completion time.\n\nIf you use, for example, `min-max` -> `completion_time`, it minimizes the maximum of your vehicle routes' completion time, i.e. it minimizes the overall makespan.\nThis only makes sense if you have more than one vehicle. In case of one vehicle, switching from `min` to `min-max` should not have any impact.\nIf you have more than one vehicle, then the algorithm tries to constantly move stops from one vehicle to another such that\nthe completion time of longest vehicle route can be further reduced. For example, if you have one vehicle that takes 8 hours\nto serve all customers, adding another vehicle (and using `min-max`) might halve the time to serve all customers to 4 hours. However,\nthis usually comes with higher transport costs.\n\nIf you want to minimize `vehicles` first and, second, `completion_time`, you can also combine different objectives like this:\n\n```json\n\"objectives\" : [\n   {\n      \"type\": \"min\",\n      \"value\": \"vehicles\"\n   },\n   {\n      \"type\": \"min\",\n      \"value\": \"completion_time\"\n   }\n]\n```\n\nIf you want to balance activities or the number of stops among all employed drivers, you need to specify it as follows:\n\n```json\n\"objectives\" : [\n   {\n      \"type\": \"min-max\",\n      \"value\": \"completion_time\"\n   },\n   {\n      \"type\": \"min-max\",\n      \"value\": \"activities\"\n   }\n]\n```\n",
            "default": "min",
            "enum": [
              "min",
              "min-max"
            ]
          },
          "value": {
            "type": "string",
            "default": "transport_time",
            "description": "The value of the objective function.\nThe objective value `transport_time` solely considers the time\nyour drivers spend on the road, i.e. transport time. In contrary to `transport_time`, `completion_time` also takes waiting times at customer sites into account.\nThe `completion_time` of a route is defined as the time from starting to ending the route,\ni.e. the route's transport time, the sum of waiting times plus the sum of activity durations.\nNote that choosing `transport_time` or `completion_time` only makes a difference if you specified time windows for your services/shipments since only in\nscenarios with time windows waiting times can occur.\nThe objective value `vehicles` can only be used along with `min` and minimizes vehicles.\n",
            "enum": [
              "completion_time",
              "transport_time",
              "vehicles",
              "activities"
            ]
          }
        },
        "example": {
          "type": "min",
          "value": "vehicles"
        },
        "required": [
          "type",
          "value"
        ]
      },
      "CostMatrix": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "type of cost matrix, currently default or google are supported",
            "enum": [
              "default",
              "google"
            ]
          },
          "location_ids": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "data": {
            "type": "object",
            "description": "JSON data of matrix response",
            "properties": {
              "times": {
                "minItems": 1,
                "type": "array",
                "items": {
                  "type": "array",
                  "items": {
                    "type": "integer",
                    "format": "int64"
                  }
                }
              },
              "distances": {
                "minItems": 1,
                "type": "array",
                "items": {
                  "type": "array",
                  "items": {
                    "type": "number",
                    "format": "double"
                  }
                }
              },
              "info": {
                "type": "object",
                "description": "Additional information for your request",
                "properties": {
                  "copyrights": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "took": {
                    "type": "number",
                    "format": "double"
                  }
                }
              }
            }
          },
          "profile": {
            "type": "string",
            "description": "vehicle profile or empty if catch all fallback"
          }
        }
      },
      "GroupRelation": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Specifies the type of relation. It must be either of type `in_sequence` or `in_direct_sequence`.\n",
            "example": "in_direct_sequence"
          },
          "groups": {
            "type": "array",
            "description": "An array of groups that should be related",
            "items": {
              "type": "string",
              "description": "group of services or shipments"
            },
            "example": [
              "group-A",
              "group-B"
            ]
          }
        },
        "required": [
          "type",
          "groups"
        ]
      },
      "JobRelation": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Specifies the type of relation. It must be either of type `in_same_route`, `in_sequence` or `in_direct_sequence`.\n\n`in_same_route`: As the name suggest, it enforces the specified services or shipments to be in the same route. It can be specified as follows:\n\n```json\n{\n   \"type\": \"in_same_route\",\n   \"ids\": [\"serv_i_id\",\"serv_j_id\"]\n}\n```\n\nThis enforces service i to be in the same route as service j no matter which vehicle will be employed. If a specific vehicle (driver) is required to conduct this, just add a `vehicle_id` like this:\n\n```\n{\n   \"type\": \"in_same_route\",\n   \"ids\": [\"serv_i_id\",\"serv_j_id\"],\n   \"vehicle_id\": \"vehicle1\"\n}\n```\n\nThis not only enforce service i and j to be in the same route, but also makes sure that both services are in the route of `vehicle1`.\n\n*Tip*: This way initial loads and vehicle routes can be modelled. For example, if your vehicles are already on the road and new orders come in, then vehicles can still be rescheduled subject to the orders that have already been assigned to these vehicles.\n\n\n\n`in_sequence`: This relation type enforces n jobs to be in sequence. It can be specified as\n\n```json\n{\n   \"type\": \"in_sequence\",\n   \"ids\": [\"serv_i_id\",\"serv_j_id\"]\n}\n```\n\nwhich means that service j need to be in the same route as service i AND it needs to occur somewhere after service i. As described above if a specific vehicle needs to conduct this, just add `vehicle_id`.\n\n\n`in_direct_sequence`: This enforces n services or shipments to be in direct sequence. It can be specified as\n\n```json\n{\n   \"type\": \"in_direct_sequence\",\n   \"ids\": [\"serv_i_id\",\"serv_j_id\",\"serv_k_id\"]\n}\n```\n\nyielding service j to occur directly after service i, and service k to occur directly after service j i.e. in strong order. Again, a vehicle can be assigned a priority by adding a `vehicle_id` to the relation.\n\n\n*Special IDs*:\nIf you look at the previous example and you want service i to be the first in the route, use the special ID `start` as follows:\n\n```json\n{\n   \"type\": \"in_direct_sequence\",\n   \"ids\": [\"start\",\"serv_i_id\",\"serv_j_id\",\"serv_k_id\"]\n}\n```\n\nLatter enforces the direct sequence of i, j and k at the beginning of the route. If this sequence should be bound to the end of the route, use the special ID `end` like this:\n\n```json\n{\n   \"type\": \"in_direct_sequence\",\n   \"ids\": [\"serv_i_id\",\"service_j_id\",\"serv_k_id\",\"end\"]\n}\n```\n\nIf you deal with services then you need to use the 'id' of your services in the field 'ids'. To also consider sequences of the pickups and deliveries of your shipments, you need to use a special ID, i.e. use the shipment id plus the keyword `_pickup` or `_delivery`. For example, to ensure that the pickup and delivery of the shipment with the id 'my_shipment' are direct neighbors, you need the following specification:\n\n```\n{\n   \"type\": \"in_direct_sequence\",\n   \"ids\": [\"my_ship_pickup\",\"my_ship_delivery\"]\n}\n```\n\n",
            "example": "in_direct_sequence"
          },
          "ids": {
            "type": "array",
            "description": "Specifies an array of shipment and/or service ids that are in relation. If you deal with services then you need to use the id of your services in ids. To also consider sequences of the pickups and deliveries of your shipments, you need to use a special ID, i.e. use your shipment id plus the keyword `_pickup` or `_delivery`. If you want to place a service or shipment activity at the beginning of your route, use the special ID `start`. In turn, use `end` to place it at the end of the route.",
            "items": {
              "type": "string"
            },
            "example": [
              "pickup-1",
              "pickup-2"
            ]
          },
          "vehicle_id": {
            "type": "string",
            "description": "Id of pre-assigned vehicle, i.e. the vehicle id that is determined to conduct the services and shipments in this relation.",
            "example": "driver-Peter"
          }
        },
        "required": [
          "type",
          "ids"
        ]
      },
      "Response": {
        "type": "object",
        "properties": {
          "copyrights": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Attribution"
            },
            "example": [
              "GraphHopper",
              "OpenStreetMap contributors"
            ]
          },
          "status": {
            "type": "string",
            "enum": [
              "waiting_in_queue",
              "processing",
              "finished"
            ],
            "description": "Indicates the current status of the job",
            "example": "finished"
          },
          "waiting_time_in_queue": {
            "type": "integer",
            "format": "int64",
            "description": "Waiting time in ms",
            "example": 300000
          },
          "processing_time": {
            "type": "integer",
            "format": "int64",
            "description": "Processing time in ms. If job is still waiting in queue, processing_time is 0",
            "example": 900000
          },
          "solution": {
            "$ref": "#/components/schemas/Solution"
          }
        }
      },
      "Solution": {
        "type": "object",
        "description": "Only available if status field indicates `finished`.",
        "properties": {
          "costs": {
            "type": "integer",
            "format": "int32",
            "deprecated": true
          },
          "distance": {
            "type": "integer",
            "format": "int32",
            "description": "Overall distance travelled in meter, i.e. the sum of each route's transport distance",
            "example": 1200
          },
          "time": {
            "type": "integer",
            "format": "int64",
            "deprecated": true,
            "description": "Use `transport_time` instead."
          },
          "transport_time": {
            "type": "integer",
            "format": "int64",
            "description": "Overall time travelled in seconds, i.e. the sum of each route's transport time.",
            "example": 12000
          },
          "max_operation_time": {
            "type": "integer",
            "format": "int64",
            "description": "Operation time of longest route in seconds.",
            "example": 4000
          },
          "waiting_time": {
            "type": "integer",
            "format": "int64",
            "description": "Overall waiting time in seconds.",
            "example": 200
          },
          "service_duration": {
            "type": "integer",
            "format": "int64",
            "description": "Overall service time in seconds.",
            "example": 1200
          },
          "preparation_time": {
            "type": "integer",
            "format": "int64",
            "description": "Overall preparation time in seconds."
          },
          "completion_time": {
            "type": "integer",
            "format": "int64",
            "description": "Overall completion time in seconds, i.e. the sum of each routes/drivers operation time.",
            "example": 12000
          },
          "no_vehicles": {
            "type": "integer",
            "format": "int32",
            "description": "Number of employed vehicles.",
            "example": 10
          },
          "no_unassigned": {
            "type": "integer",
            "format": "int32",
            "description": "Number of jobs that could not be assigned to final solution.",
            "example": 1
          },
          "routes": {
            "type": "array",
            "description": "An array of routes",
            "items": {
              "$ref": "#/components/schemas/Route"
            }
          },
          "unassigned": {
            "type": "object",
            "properties": {
              "services": {
                "type": "array",
                "description": "An array of ids of unassigned services",
                "items": {
                  "type": "string",
                  "description": "Id of unassigned service"
                },
                "example": [
                  "service-1",
                  "service-3"
                ]
              },
              "shipments": {
                "type": "array",
                "description": "An array of ids of unassigned shipments",
                "example": [
                  "shipment-5"
                ],
                "items": {
                  "type": "string",
                  "description": "Id of unassigned shipments"
                }
              },
              "breaks": {
                "type": "array",
                "description": "An array of ids of unassigned breaks",
                "items": {
                  "type": "string",
                  "description": "Id of unassigned breaks"
                }
              },
              "details": {
                "type": "array",
                "description": "An array of details, i.e. reason for unassigned services or shipments",
                "items": {
                  "$ref": "#/components/schemas/Detail"
                },
                "example": [
                  {
                    "id": "service-1",
                    "code": 3,
                    "reason": "does not fit into any vehicle due to capacity"
                  },
                  {
                    "id": "service-2",
                    "code": 27,
                    "reason": "could not be assigned due to max job constraint"
                  },
                  {
                    "id": "shipment-5",
                    "code": 2,
                    "reason": "cannot be visited within time window"
                  }
                ]
              }
            }
          }
        }
      },
      "Detail": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Id of unassigned service/shipment"
          },
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "Reason code\n\nCode   |  Reason\n:------|:---------\n1 | cannot serve required skill\n2 | cannot be visited within time window\n3 | does not fit into any vehicle due to capacity\n4 | cannot be assigned due to max distance constraint of vehicles\n21 | could not be assigned due to relation constraint\n22 | could not be assigned due to allowed vehicle constraint\n23 | could not be assigned due to max-time-in-vehicle constraint\n24 | driver does not need a break\n25 | could not be assigned due to disallowed vehicle constraint\n26 | could not be assigned due to max drive time constraint\n27 | could not be assigned due to max job constraint\n28 | could not be assigned due to max activity constraint\n50 | underlying location cannot be accessed over road network by at least one vehicle\n"
          },
          "reason": {
            "type": "string",
            "description": "Human readable reason as listed above"
          }
        }
      },
      "Route": {
        "type": "object",
        "properties": {
          "vehicle_id": {
            "type": "string",
            "description": "Id of vehicle that operates route",
            "example": "driver-stefan"
          },
          "distance": {
            "type": "integer",
            "format": "int64",
            "description": "Distance of route in meter",
            "example": 10000
          },
          "transport_time": {
            "type": "integer",
            "format": "int64",
            "description": "Transport time of route in seconds",
            "example": 1800
          },
          "completion_time": {
            "type": "integer",
            "format": "int64",
            "description": "Completion time of route in seconds",
            "example": 1800
          },
          "waiting_time": {
            "type": "integer",
            "format": "int64",
            "description": "Waiting time of route in seconds"
          },
          "service_duration": {
            "type": "integer",
            "format": "int64",
            "description": "Service duration of route in seconds"
          },
          "preparation_time": {
            "type": "integer",
            "format": "int64",
            "description": "Preparation time of route in seconds"
          },
          "activities": {
            "type": "array",
            "description": "Array of activities",
            "items": {
              "$ref": "#/components/schemas/Activity"
            },
            "example": [
              {
                "type": "start",
                "location_id": "berlin",
                "address": {
                  "location_id": "berlin",
                  "lat": 52.537,
                  "lon": 13.406
                },
                "end_time": 1551122400,
                "end_date_time": "2019-02-25T20:20+01:00",
                "distance": 0,
                "driving_time": 0,
                "preparation_time": 0,
                "waiting_time": 0,
                "load_after": [
                  0
                ]
              },
              {
                "type": "service",
                "id": "berlin-2",
                "location_id": "13.408642_52.527094",
                "address": {
                  "location_id": "13.408642_52.527094",
                  "lat": 52.527094,
                  "lon": 13.408642
                },
                "arr_time": 1551122713,
                "arr_date_time": "2019-02-25T20:25:13+01:00",
                "end_time": 1551122713,
                "end_date_time": "2019-02-25T20:25:13+01:00",
                "waiting_time": 0,
                "distance": 1777,
                "driving_time": 313,
                "preparation_time": 0,
                "load_before": [
                  0
                ],
                "load_after": [
                  0
                ]
              },
              {
                "type": "service",
                "id": "berlin-1",
                "location_id": "13.398170_52.527303",
                "address": {
                  "location_id": "13.398170_52.527303",
                  "lat": 52.527303,
                  "lon": 13.39817
                },
                "arr_time": 1551122864,
                "arr_date_time": "2019-02-25T20:27:44+01:00",
                "end_time": 1551122864,
                "end_date_time": "2019-02-25T20:27:44+01:00",
                "waiting_time": 0,
                "distance": 2562,
                "driving_time": 464,
                "preparation_time": 0,
                "load_before": [
                  0
                ],
                "load_after": [
                  0
                ]
              },
              {
                "type": "end",
                "location_id": "berlin",
                "address": {
                  "location_id": "berlin",
                  "lat": 52.537,
                  "lon": 13.406
                },
                "arr_time": 1551123189,
                "arr_date_time": "2019-02-25T20:33:09+01:00",
                "distance": 4334,
                "driving_time": 789,
                "preparation_time": 0,
                "waiting_time": 0,
                "load_before": [
                  0
                ]
              }
            ]
          },
          "points": {
            "type": "array",
            "description": "Array of route planning points",
            "items": {
              "$ref": "#/components/schemas/RoutePoint"
            },
            "example": [
              {
                "coordinates": [
                  [
                    13.4061,
                    52.53701
                  ],
                  [
                    13.40643,
                    52.53634
                  ],
                  [
                    13.4067,
                    52.53573
                  ],
                  [
                    13.40722,
                    52.53479
                  ],
                  [
                    13.40729,
                    52.53468
                  ],
                  [
                    13.40735,
                    52.53463
                  ],
                  [
                    13.41205,
                    52.53275
                  ],
                  [
                    13.41245,
                    52.53264
                  ],
                  [
                    13.41218,
                    52.53166
                  ],
                  [
                    13.41205,
                    52.53139
                  ],
                  [
                    13.41177,
                    52.53112
                  ],
                  [
                    13.41072,
                    52.53033
                  ],
                  [
                    13.41049,
                    52.53014
                  ],
                  [
                    13.4098,
                    52.52928
                  ],
                  [
                    13.40937,
                    52.5287
                  ],
                  [
                    13.40994,
                    52.52858
                  ],
                  [
                    13.41032,
                    52.52782
                  ],
                  [
                    13.41054,
                    52.52745
                  ],
                  [
                    13.41097,
                    52.52656
                  ],
                  [
                    13.41107,
                    52.5265
                  ],
                  [
                    13.41119,
                    52.52614
                  ],
                  [
                    13.41119,
                    52.52604
                  ],
                  [
                    13.41109,
                    52.52587
                  ],
                  [
                    13.40971,
                    52.52631
                  ],
                  [
                    13.40981,
                    52.52659
                  ],
                  [
                    13.40891,
                    52.52683
                  ],
                  [
                    13.40852,
                    52.52695
                  ]
                ],
                "type": "LineString"
              },
              {
                "coordinates": [
                  [
                    13.40852,
                    52.52695
                  ],
                  [
                    13.4081,
                    52.52706
                  ],
                  [
                    13.40802,
                    52.52696
                  ],
                  [
                    13.40469,
                    52.52758
                  ],
                  [
                    13.4033,
                    52.52781
                  ],
                  [
                    13.40331,
                    52.52767
                  ],
                  [
                    13.40298,
                    52.52763
                  ],
                  [
                    13.40261,
                    52.52807
                  ],
                  [
                    13.39818,
                    52.52726
                  ]
                ],
                "type": "LineString"
              },
              {
                "coordinates": [
                  [
                    13.39818,
                    52.52726
                  ],
                  [
                    13.39808,
                    52.52725
                  ],
                  [
                    13.39785,
                    52.52768
                  ],
                  [
                    13.39727,
                    52.52866
                  ],
                  [
                    13.39762,
                    52.52876
                  ],
                  [
                    13.3976,
                    52.52914
                  ],
                  [
                    13.39756,
                    52.52943
                  ],
                  [
                    13.39597,
                    52.53243
                  ],
                  [
                    13.39777,
                    52.5325
                  ],
                  [
                    13.39843,
                    52.53254
                  ],
                  [
                    13.39891,
                    52.53259
                  ],
                  [
                    13.40288,
                    52.53354
                  ],
                  [
                    13.40297,
                    52.53359
                  ],
                  [
                    13.40338,
                    52.534
                  ],
                  [
                    13.40466,
                    52.53419
                  ],
                  [
                    13.40433,
                    52.53503
                  ],
                  [
                    13.40443,
                    52.53511
                  ],
                  [
                    13.40541,
                    52.53611
                  ],
                  [
                    13.40547,
                    52.53615
                  ],
                  [
                    13.40643,
                    52.53634
                  ],
                  [
                    13.4061,
                    52.53701
                  ]
                ],
                "type": "LineString"
              }
            ]
          }
        }
      },
      "RoutePoint": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "coordinates": {
            "type": "array",
            "items": {
              "type": "object"
            }
          }
        }
      },
      "Activity": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "type of activity",
            "enum": [
              "start",
              "end",
              "service",
              "pickupShipment",
              "deliverShipment",
              "pickup",
              "delivery",
              "break"
            ]
          },
          "id": {
            "type": "string",
            "description": "Id referring to the underlying service or shipment, i.e. the shipment or service this activity belongs to"
          },
          "location_id": {
            "type": "string",
            "description": "Id that refers to address"
          },
          "address": {
            "$ref": "#/components/schemas/ResponseAddress"
          },
          "arr_time": {
            "type": "integer",
            "format": "int64",
            "description": "Arrival time at this activity in seconds. If type is `start`, this is not available (since it makes no sense to have `arr_time` at start). However, `end_time` is available and actually means \\\"departure time\\\" at start location. It is important to note that `arr_time` does not necessarily mean \\\"start of underlying activity\\\", it solely means arrival time at activity location. If this activity has no time windows and if there are no further preparation times, `arr_time` is equal to activity start time."
          },
          "end_time": {
            "type": "integer",
            "format": "int64",
            "description": "End time of and thus departure time at this activity. If type is `end`, this is not available (since it makes no sense to have an `end_time` at end) `end_time` at each activity is equal to the departure time at the activity location."
          },
          "end_date_time": {
            "type": "string",
            "format": "date-time",
            "description": "End date time with offset like this 1970-01-01T01:00+01:00. If you do not use time-dependent optimization, this is `null`."
          },
          "arr_date_time": {
            "type": "string",
            "format": "date-time",
            "description": "Arrival date time with offset like this 1970-01-01T01:00+01:00. If you do not use time-dependent optimization, this is `null`."
          },
          "waiting_time": {
            "type": "integer",
            "format": "int64",
            "description": "Waiting time at this activity in seconds. A waiting time can occur if the activity has at least one time window. If `arr_time` < `time_window.earliest` a waiting time of `time_window_earliest` - `arr_time` occurs."
          },
          "preparation_time": {
            "type": "integer",
            "format": "int64",
            "description": "preparation time at this activity in seconds"
          },
          "distance": {
            "type": "integer",
            "format": "int64",
            "description": "cumulated distance from start to this activity in m"
          },
          "driving_time": {
            "type": "integer",
            "format": "int64",
            "description": "cumulated driving time from start to this driver activity in seconds"
          },
          "load_before": {
            "type": "array",
            "description": "Array with size/capacity dimensions before this activity",
            "items": {
              "type": "integer",
              "format": "int32",
              "description": "dimension value"
            }
          },
          "load_after": {
            "type": "array",
            "description": "Array with size/capacity dimensions after this activity",
            "items": {
              "type": "integer",
              "format": "int32",
              "description": "dimension value"
            }
          }
        }
      }
    }
 * }
 */
