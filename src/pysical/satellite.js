import vector from "./vectors";
import * as THREE from "three";
import { Vector3 } from "three";


class Satellite {
    constructor(
      position,
      speed,
      angleXY,
      angleXZ,
      raduis,
      type,
      mass,
      drag_coeff,
      angular_velocity,
      resistanse_coeff,
      friction_coeff
    ) {
      this.position = position;
      this.velocity = vector.create(0, 0, 0);
      this.velocity.inits(speed, angleXY, angleXZ);
      this.type = type;
      this.drag_coeff = drag_coeff;
      this.rolling = false;
      this.resistanse_coeff = resistanse_coeff;
      this.friction_coeff = friction_coeff;
      this.raduis = raduis; //m

      if (this.type == 1) {
        this.rho = 500; // kg/m^3  wood
        this.resistanse_coeff = 0.4603;
        this.friction_coeff = 0.4;
      } else if (this.type == 2) {
        this.rho = 7860; // steel
        this.resistanse_coeff = 0.597;
        this.friction_coeff = 0.7;
      } else if (this.type == 3) {
        this.rho = 1100; // rubber
        this.resistanse_coeff = 0.828;
        this.friction_coeff = 0.7;
      }
      if (this.type == 0) {
        // user value
        this.mass = mass;
      } else {
        this.mass = this.rho * (4 / 3) * Math.PI * Math.pow(this.raduis, 3); //kg
      }
      this.area = Math.PI * Math.pow(this.raduis, 2);
      this.rotateAngle = 0;
      this.rotateAxes = vector.create(
        angular_velocity.getX() > 0 ? 1 : 0,
        angular_velocity.getY(),
        angular_velocity.getZ()
      );
      this.angular_velocity = angular_velocity;
      this.angular_acc = new THREE.Vector3();
      const I = (2 / 5) * this.mass * Math.pow(this.raduis, 2);
      this.IBody = new THREE.Matrix3().set(I, 0, 0, 0, I, 0, 0, 0, I).invert();
      this.quaternion = new THREE.Quaternion();
      this.rotationMatrix = new THREE.Matrix3();
      this.intersectsObjects = [];
    }
    calculate_force(){

    }
    




    resetForce()
    {
        xFor = 0;
        yFor = 0;
    }










  }