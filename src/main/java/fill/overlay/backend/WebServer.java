package fill.overlay.backend;

import fill.overlay.backend.model.GameData;
import fill.overlay.backend.model.Player;
import fill.overlay.backend.model.Team;
import io.javalin.Javalin;
import io.javalin.core.util.RouteOverviewPlugin;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WebServer {
    public static final Map<String, GameData> gameDataMap = new HashMap<>();

    public static void main(String[] args) {
        Javalin app = Javalin.create(javalinConfig -> {
            javalinConfig.enableCorsForAllOrigins();
            javalinConfig.registerPlugin(new RouteOverviewPlugin("/"));
            javalinConfig.addStaticFiles("/http");
        }).start(7000);

        app.get("/api/:key", ctx -> {
            String key = ctx.pathParam("key");
            ctx.json(getOrCreateGamedata(key));
        });

        app.post("/api/:key", ctx -> {
            String key = ctx.pathParam("key");
            GameData gameData = ctx.bodyAsClass(GameData.class);
            gameDataMap.put(key, gameData);
            ctx.json(gameData);
            System.out.println("Recieved json data");
        });
        app.get("/logos/:name",ctx -> {
            String name = ctx.pathParam("name");
            ctx.contentType("image/png");
            Path path = Paths.get("logos").resolve(name + ".png");
            ctx.result(Files.newInputStream(path));
        });
    }

    public static GameData getOrCreateGamedata(String key){
        return gameDataMap.computeIfAbsent(key, s -> {
            GameData gameData = new GameData();
            gameData.setTeam1(getDefaultTeam());
            gameData.setTeam2(getDefaultTeam());
            return gameData;
        });
    }

    public static Team getDefaultTeam(){
        Team team = new Team();
        team.setName("Team Name");
        team.setIcon("Logo1");
        team.setPlayers(getDefaultPlayers());
        return team;
    }
    public static List<Player> getDefaultPlayers(){
        List<Player> playerList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            playerList.add(getDefaultPlayer(i+1));
        }
        return playerList;
    }
    public static Player getDefaultPlayer(int number){
        Player player = new Player();
        player.setName("Player Name " + number);
        player.setIcon("Breach");
        return player;
    }
}
