class CameraRepository:
  def list_all(self):
      return [{"uid":"mock"}]


from camera_repo import CameraRepository

class CameraService:
  def __init__(self):
      self.repo = CameraRepository()

  def list_camera(self):
    return self.repo.listall()


class CameraService:
  def __init__(self, repo):
    self.repo = repo

  def list_cameras(self):
    return self.repo.list_all()
