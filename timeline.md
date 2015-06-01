# Throw Timeline

### init
1. Connect to *Firebase*.
  * Access to **fb** database
  - Loads **playlist** and other info associated with initial **sessionId**
  - 
- Connect to *YouTube Data API*
  - Gives the ability to search for videos
  - But more importantly to the start of the app, the ability to find related videos.
  - However, I guess this all doesn't matter too much.
- Connect to YouTube Player API
  - Allows actual playback
  - Is slow as balls starting up

###playing
####player states
- 0: Stopped
 - Should be 0.0 opacity, showing background noise
 - Waits for something to be added to playlist
- 1: Playing (?)
 - Should be 1.0 opacity
- 2: Paused
 - 
- 3: (?)


note:
scheme for keeping active places
each computer knows their GUID, places that in an object connected to the session
{
 GUID: timestamp
}
every time a vote is cast, the timestamp is updated
every time a vote is cast, a master is appointed (?) this master removes any stale GUIDs. 
alternatively: every voter checks list and culls stale GUIDs

Is making every modification directed maybe enough?
Never say move here, but rather say move here, which is one above this