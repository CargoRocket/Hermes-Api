import polyline from '@mapbox/polyline';

export const transformToMapbox = (ghResponse) => {
  console.log(ghResponse);
  console.log(polyline.decode(ghResponse.paths[0].points));
  return MapboxRouteResponse(
    routes=ghResponse.paths.map((path) => 
      MapboxRoute(
        geometry=path.points,
        legs=[

        ],
        weight_name='',
        weight=path.weight,
        duration=path.time,
        distance=path.distance,
      )
    ),
    waypoints=[
      MapboxWaypoint(
        ghResponse.paths[0].distance,
        [
          ghResponse.paths[0].bbox[0],
          ghResponse.paths[0].bbox[1],
        ]
      ),
      MapboxWaypoint(
        ghResponse.paths[0].distance,
        [
          ghResponse.paths[0].bbox[2],
          ghResponse.paths[0].bbox[3],
        ]
      )
    ],
  )
}

const MapboxIntersection = (entry,bearings, location, out=0) => ({
  entry,
  bearings,
  location,
  out,
})

const MapboxManuever = (bearing_after, bearing_before, location, type, instruction) => ({
  bearing_after,
  bearing_before,
  location,
  type,
  instruction,
})

const MapboxStep = (intersections, geometry, mode, manuever, weight, duration, distance, name='', driving_side='right') => ({
  intersections,
  geometry,
  mode,
  manuever,
  weight,
  duration,
  distance,
  name,
  driving_side,
})

const MapboxLeg = (weight, duration, steps, distance, summary='') => ({
  summary,
  weight,
  duration,
  steps,
  distance,
})

const MapboxRoute = (geometry, legs, weight_name, weight, duration, distance) => ({
  geometry,
  legs,
  weight_name,
  weight,
  duration,
  distance,
})

const MapboxWaypoint = (distance, location, name='') => ({
  distance,
  name,
  location,
})

const MapboxRouteResponse = (routes, waypoints, code='Ok', uuid='No-valid-uuid') => ({
  routes,
  waypoints,
  code,
  uuid,
})