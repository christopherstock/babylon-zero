    public static createStairs(width = 8, height = 10, depth = 20)
    {
        let stepHeight = 0.5;

        let numSteps = (depth * 2) * stepHeight;
        let stepDepth = height / numSteps;

        let v = [];
        let p = new BABYLON.Vector2(height, depth/ (numSteps * stepHeight));
        v.push(new BABYLON.Vector2(p.x, p.y));
        for (let i=0;i<numSteps;i++) {
            p = p.add(new BABYLON.Vector2(0, stepHeight));
            v.push(new BABYLON.Vector2(p.x, p.y));
            p = p.add(new BABYLON.Vector2(-stepDepth, 0));
            v.push(new BABYLON.Vector2(p.x, p.y));
        }
        v.push(new BABYLON.Vector2(0, 0));
        v.push(new BABYLON.Vector2(height, 0));
        const sb = new BABYLON.PolygonMeshBuilder("stairs", v);
        let stairs = sb.build(false, width);
        stairs.position = new BABYLON.Vector3(width/2, 0, 0);
        let deg = 1.5708
        stairs.rotation = new BABYLON.Vector3(0, deg * 2, deg);
    }
