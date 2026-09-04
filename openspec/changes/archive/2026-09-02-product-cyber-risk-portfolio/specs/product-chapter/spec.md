## MODIFIED Requirements

### Requirement: Artifacts render in the flipbook frame

Every artifact SHALL render inside a centered, `object-contain` frame that scales the image to the
slot's width without cropping it. The frame SHALL NOT add a border, rounded corners, a shadow, or any
other decoration of its own: these screenshots carry their own chrome, and a second frame around it
reads as a frame within a frame.

#### Scenario: Artifact is presented undecorated

- **WHEN** an artifact renders in a chapter
- **THEN** the image scales to the slot width with no border, corner radius, or shadow around it

#### Scenario: Artifacts are not interactive

- **WHEN** a visitor clicks an artifact image
- **THEN** nothing happens; there is no lightbox, zoom, or link
