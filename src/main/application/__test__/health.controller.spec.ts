import { HealthController } from "src/main/application/controllers/health.controller";

describe("HealthController", () => {
  describe("healthCheck", () => {
    it("should return 'Ok!'", () => {
      // Arrange
      const healthController = new HealthController();
      // Act
      const result = healthController.healthCheck();
      // Assert
      expect(result).toBe("Ok!");
    });
  });
});
